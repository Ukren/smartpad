import { useLocation, useNavigate } from 'react-router-dom'
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { NotesTwoTone, StarTwoTone } from '@mui/icons-material'

const NAV_ITEMS = [
  {
    label: 'All Notes',
    path: '/notes',
    icon: NotesTwoTone,
  },
  {
    label: 'Pinned Notes',
    path: '/notes/pinned',
    icon: StarTwoTone,
  },
]

export const SidebarNav = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <List>
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon

        return (
          <ListItemButton
            key={item.path}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        )
      })}
    </List>
  )
}
