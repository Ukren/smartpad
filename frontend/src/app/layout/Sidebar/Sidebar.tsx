import { useNavigate } from 'react-router-dom'

import { Drawer, Button } from '@mui/material'
import { SidebarNav } from './components/SidebarNav'

import { AddOutlined } from '@mui/icons-material'
interface SidebarProps {
  width: number
}

export const Sidebar = ({ width }: SidebarProps) => {
  const navigate = useNavigate()

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          position: 'relative',
          height: '100%',
          boxSizing: 'border-box',
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
    </Drawer>
  )
}
