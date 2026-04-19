import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

import { Header } from './Header/Header'
import { Sidebar } from './Sidebar'

const SIDEBAR_WIDTH = 240

export const AppLayout = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <Header sidebarWidth={SIDEBAR_WIDTH} />

    <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <Sidebar width={SIDEBAR_WIDTH} />

      <Box component="main" sx={{ flex: 1, overflow: 'auto', p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  </Box>
)
