'use server'

import { z, flattenError } from 'zod'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

const registerSchema = z.object({
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'),
  username: z
    .string()
    .min(3, 'At least 3 characters')
    .max(20, 'At most 20 characters'),
  password: z.string().min(8, 'At least 8 characters'),
})

const loginSchema = z.object({
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'),
  password: z.string().min(1, 'Required'),
})

export type AuthState = {
  success?: boolean
  message?: string
  errors?: {
    email?: string[]
    username?: string[]
    password?: string[]
    form?: string[]
  }
}

export async function register(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = registerSchema.safeParse({
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { errors: flattenError(parsed.error).fieldErrors }
  }

  const { email, username, password } = parsed.data
  const supabase = await createClient()

  const { data: existing } = await supabase
    .from('profiles')
    .select('username')
    .eq('username', username)
    .maybeSingle()

  if (existing) {
    return { errors: { username: ['Username is already taken'] } }
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username } },
  })

  if (error) {
    return { errors: { form: [error.message] } }
  }

  await supabase.auth.signOut()

  return { success: true, message: 'Account created! You can now sign in.' }
}

export async function login(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { errors: flattenError(parsed.error).fieldErrors }
  }

  const { email, password } = parsed.data
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({ email, password })

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
