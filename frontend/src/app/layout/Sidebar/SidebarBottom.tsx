import Box from '@mui/material/Box'
import { useLocation } from 'react-router-dom'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { useDashboardLayout } from '../context/DashboardLayoutContext'
import { SidebarItem } from './SidebarItem'

export const SidebarBottom = () => {
  const { pathname } = useLocation()
  const { isMobile, setSidebarOpen } = useDashboardLayout()

  const closeOnMobile = () => {
    if (isMobile) setSidebarOpen(false)
  }

  return (
    <Box sx={{ pb: 1, pt: 0.5 }}>
      <SidebarItem icon={<SettingsOutlinedIcon />} label="Settings" />
      <SidebarItem
        href="/notes/deleted"
        onClick={closeOnMobile}
        icon={<DeleteOutlinedIcon />}
        label="Trash"
        selected={pathname === '/notes/deleted'}
      />
    </Box>
  )
}
