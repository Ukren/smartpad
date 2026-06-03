import { Outlet } from 'react-router-dom'
import { Alert, Box } from '@mui/material'

import { Header } from './Header/Header'
import { Sidebar } from './Sidebar'
import { useCurrentUser } from '../../hooks/useAuth'

export const AppLayout = () => {
  const { data: user } = useCurrentUser()
  const isDemo = user?.email === 'demo@example.com'

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {isDemo && (
        <Alert severity="info" sx={{ borderRadius: 0, py: 0.5 }}>
          You&apos;re using the demo account — feel free to explore.
          Credentials: <strong>demo@example.com</strong> /{' '}
          <strong>password123</strong>
        </Alert>
      )}
      <Header />

      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />

        <Box component="main" sx={{ flex: 1, overflow: 'auto', p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
