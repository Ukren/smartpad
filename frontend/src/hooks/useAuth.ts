import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getMe, login, logout, register } from '../api/auth'
import type { LoginFormValues, RegisterFormValues } from '../schemas/auth'

export const useCurrentUser = () =>
  useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    retry: false,
  })

export const useLogin = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: LoginFormValues) => login(data),
    onSuccess: (user) => {
      queryClient.setQueryData(['me'], user)
      navigate('/notes')
    },
  })
}

export const useRegister = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: RegisterFormValues) =>
      register({ name: data.name, email: data.email, password: data.password }),
    onSuccess: () => navigate('/login'),
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear()
      navigate('/login')
    },
  })
}
