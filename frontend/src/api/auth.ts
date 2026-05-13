import apiClient from './apiClient'
import type { LoginFormValues, RegisterFormValues } from '../schemas/auth'

export type User = {
  id: string
  name: string
  email: string
}

export const getMe = (): Promise<User> =>
  apiClient.get('/auth/me').then((r) => r.data)

export const login = (data: LoginFormValues): Promise<User> =>
  apiClient.post('/auth/login', data).then((r) => r.data)

export const register = (
  data: Omit<RegisterFormValues, 'confirmPassword'>
): Promise<User> => apiClient.post('/auth/register', data).then((r) => r.data)

export const logout = (): Promise<void> =>
  apiClient.post('/auth/logout').then(() => undefined)
