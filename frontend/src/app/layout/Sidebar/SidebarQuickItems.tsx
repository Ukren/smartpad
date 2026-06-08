import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import { useDashboardLayout } from '../context/DashboardLayoutContext'
import { SidebarItem } from './SidebarItem'

export const SidebarQuickItems = () => {
  const { pathname } = useLocation()
  const { isMobile, setSidebarOpen } = useDashboardLayout()

  const closeOnMobile = () => {
    if (isMobile) setSidebarOpen(false)
  }

  return (
    <Box sx={{ mb: 0.5 }}>
      <SidebarItem
        href="/notes"
        onClick={closeOnMobile}
        icon={<SearchIcon />}
        label="Search"
      />
      <SidebarItem
        href="/notes"
        onClick={closeOnMobile}
        icon={<HomeOutlinedIcon />}
        label="All Notes"
        selected={pathname === '/notes' || pathname === '/'}
      />
    </Box>
  )
}
