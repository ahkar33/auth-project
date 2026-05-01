'use server'

import { z, flattenError } from 'zod'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

const registerSchema = z
  .object({
    name: z.string().min(2, 'At least 2 characters').max(50, 'At most 50 characters'),
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'),
    pass: z.string().min(8, 'At least 8 characters'),
    re_pass: z.string().min(1, 'Required'),
    contact: z.string().min(1, 'Required'),
    'agree-term': z.literal('on', { errorMap: () => ({ message: 'You must agree to the terms' }) }),
  })
  .refine(data => data.pass === data.re_pass, {
    message: 'Passwords do not match',
    path: ['re_pass'],
  })

const loginSchema = z.object({
  username: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
})

export type AuthState = {
  success?: boolean
  message?: string
  errors?: {
    name?: string[]
    email?: string[]
    pass?: string[]
    re_pass?: string[]
    contact?: string[]
    'agree-term'?: string[]
    username?: string[]
    password?: string[]
    form?: string[]
  }
}

export async function register(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = registerSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    pass: formData.get('pass'),
    re_pass: formData.get('re_pass'),
    contact: formData.get('contact'),
    'agree-term': formData.get('agree-term'),
  })

  if (!parsed.success) {
    return { errors: flattenError(parsed.error).fieldErrors }
  }

  const { name, email, pass, contact } = parsed.data
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password: pass,
    options: { data: { name, contact } },
  })

  if (error) {
    return { errors: { form: [error.message] } }
  }

  await supabase.auth.signOut()

  return { success: true, message: 'Account created! You can now sign in.' }
}

export async function login(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = loginSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { errors: flattenError(parsed.error).fieldErrors }
  }

  const { username, password } = parsed.data
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('email')
    .eq('username', username)
    .maybeSingle()

  if (!profile?.email) {
    return { errors: { username: ['Username not found'] } }
  }

  const { error } = await supabase.auth.signInWithPassword({ email: profile.email, password })

  if (error) {
    return { errors: { form: [error.message] } }
  }

  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
