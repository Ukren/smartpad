import { useNavigate } from 'react-router-dom'
import { Drawer, List, ListItemButton, ListItemText } from '@mui/material'

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
      <List>
        <ListItemButton onClick={() => navigate('/notes')}>
          <ListItemText primary="All Notes" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate('/notes/new')}>
          <ListItemText primary="New Note" />
        </ListItemButton>
      </List>
    </Drawer>
  )
}
