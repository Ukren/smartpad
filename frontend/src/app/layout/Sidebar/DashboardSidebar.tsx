import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { DRAWER_WIDTH } from '../constants'
import { palette } from '../../../theme/tokens'
import { useDashboardLayout } from '../context/DashboardLayoutContext'
import { SidebarWorkspaceHeader } from './SidebarWorkspaceHeader'
import { SidebarQuickItems } from './SidebarQuickItems'
import { SidebarPrivateNotes } from './SidebarPrivateNotes'
import { SidebarTbdSection } from './SidebarTbdSection'
import { SidebarBottom } from './SidebarBottom'

export default function DashboardSidebar() {
  const theme = useTheme()
  const { sidebarOpen, setSidebarOpen, isMobile } = useDashboardLayout()

  const content = (
    <Box
      sx={(t) => ({
        width: DRAWER_WIDTH,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: palette.sidebarBg,
        ...t.applyStyles('dark', { backgroundColor: palette.sidebarBgDark }),
      })}
    >
      <SidebarWorkspaceHeader />

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          px: '6px',
          pb: 1,
        }}
      >
        <SidebarQuickItems />
        <SidebarPrivateNotes />
        <SidebarTbdSection />
      </Box>

      <Box
        sx={(t) => ({
          px: '6px',
          borderTop: `1px solid ${palette.border}`,
          ...t.applyStyles('dark', {
            borderTop: `1px solid ${palette.borderDark}`,
          }),
        })}
      >
        <SidebarBottom />
      </Box>
    </Box>
  )

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          displayPrint: 'none',
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            border: 0,
            backgroundImage: 'none',
          },
        }}
      >
        {content}
      </Drawer>
    )
  }

  return (
    <Box
      component="aside"
      sx={(t) => ({
        displayPrint: 'none',
        flexShrink: 0,
        width: sidebarOpen ? DRAWER_WIDTH : 0,
        overflow: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: sidebarOpen
            ? theme.transitions.duration.enteringScreen
            : theme.transitions.duration.leavingScreen,
        }),
        borderRight: `1px solid ${palette.border}`,
        ...t.applyStyles('dark', {
          borderRight: `1px solid ${palette.borderDark}`,
        }),
      })}
    >
      {content}
    </Box>
  )
}
