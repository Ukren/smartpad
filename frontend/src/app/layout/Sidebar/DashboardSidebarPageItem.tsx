import * as React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Link } from 'react-router-dom'
import DashboardSidebarContext from '../context/DashboardSidebarContext'

export interface DashboardSidebarPageItemProps {
  id: string
  title: string
  icon?: React.ReactNode
  href: string
  selected?: boolean
  disabled?: boolean
}

export default function DashboardSidebarPageItem({
  title,
  icon,
  href,
  selected = false,
  disabled = false,
}: DashboardSidebarPageItemProps) {
  const sidebarContext = React.useContext(DashboardSidebarContext)
  const { mini = false } = sidebarContext ?? {}

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        component={Link}
        to={href}
        selected={selected}
        disabled={disabled}
        sx={{
          minHeight: 48,
          justifyContent: mini ? 'center' : 'initial',
          px: 2.5,
        }}
      >
        {icon && (
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: mini ? 'auto' : 2,
              justifyContent: 'center',
            }}
          >
            {icon}
          </ListItemIcon>
        )}
        <ListItemText primary={title} sx={{ opacity: mini ? 0 : 1 }} />
      </ListItemButton>
    </ListItem>
  )
}
