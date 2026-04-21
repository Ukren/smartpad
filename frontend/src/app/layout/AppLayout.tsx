import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

import { Header } from './Header/Header'
import { Sidebar } from './Sidebar'

export const AppLayout = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <Header />

    <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <Sidebar />

      <Box component="main" sx={{ flex: 1, overflow: 'auto', p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  </Box>
)
