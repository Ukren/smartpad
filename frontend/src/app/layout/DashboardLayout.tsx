import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from './Sidebar/DashboardSidebar'
import { DashboardLayoutContext } from './context/DashboardLayoutContext'
import { useCurrentUser } from '../../hooks/useAuth'
import { palette } from '../../theme/tokens'

export default function DashboardLayout() {
  const theme = useTheme()
  const { data: user } = useCurrentUser()
  const isDemo = user?.email === 'demo@example.com'

  const isMobile = !useMediaQuery(theme.breakpoints.up('md'))

  const [desktopOpen, setDesktopOpen] = React.useState(true)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const sidebarOpen = isMobile ? mobileOpen : desktopOpen

  const setSidebarOpen = React.useCallback(
    (open: boolean) => {
      if (isMobile) setMobileOpen(open)
      else setDesktopOpen(open)
    },
    [isMobile]
  )

  const contextValue = React.useMemo(
    () => ({ sidebarOpen, setSidebarOpen, isMobile }),
    [sidebarOpen, setSidebarOpen, isMobile]
  )

  return (
    <DashboardLayoutContext.Provider value={contextValue}>
      <Box
        sx={(t) => ({
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          backgroundColor: palette.appBg,
          ...t.applyStyles('dark', { backgroundColor: palette.appBgDark }),
        })}
      >
        {isDemo && (
          <Alert severity="info" sx={{ borderRadius: 0, py: 0.25 }}>
            You&apos;re using the demo account — feel free to explore.
            Credentials: <strong>demo@example.com</strong> /{' '}
            <strong>password123</strong>
          </Alert>
        )}

        <Box sx={{ display: 'flex', flex: 1, minHeight: 0, width: '100%' }}>
          <DashboardSidebar />

          <Box
            component="main"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minWidth: 0,
              overflow: 'auto',
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </DashboardLayoutContext.Provider>
  )
}
