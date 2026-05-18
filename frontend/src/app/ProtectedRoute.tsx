import { Navigate, Outlet } from 'react-router-dom'
import { useCurrentUser } from '../hooks/useAuth'
import { Loader } from '../components'

export const ProtectedRoute = () => {
  const { data: user, isLoading, isError } = useCurrentUser()

  if (isLoading) return <Loader />
  if (isError || !user) return <Navigate to="/login" replace />

  return <Outlet />
}
