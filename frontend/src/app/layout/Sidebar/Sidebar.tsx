import { useNavigate } from 'react-router-dom'
import { SIDEBAR_WIDTH } from '../const/sidebar'

import { Drawer, Button } from '@mui/material'
import { SidebarNav } from './components/SidebarNav'
import { SidebarTags } from './components/SidebarTags'
import { SidebarFooter } from './components/SidebarFooter'

import { AddOutlined } from '@mui/icons-material'

export const Sidebar = () => {
  const navigate = useNavigate()

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          position: 'relative',
          height: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Button
        variant="contained"
        startIcon={<AddOutlined />}
        onClick={() => navigate('/notes/new')}
        sx={{ mt: 1, mb: 2, width: 150 }}
      >
        New Note
      </Button>
      <SidebarNav />
      <SidebarTags />
      <SidebarFooter />
    </Drawer>
  )
}
