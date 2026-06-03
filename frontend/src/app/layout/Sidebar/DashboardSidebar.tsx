import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import { useLocation } from 'react-router-dom'
import DashboardSidebarContext from '../context/DashboardSidebarContext'
import { DRAWER_WIDTH, MINI_DRAWER_WIDTH } from '../constants'
import {
  getDrawerSxTransitionMixin,
  getDrawerWidthTransitionMixin,
} from '../mixins'
import { SidebarNavItems } from './SidebarNavItems'
import { SidebarFooter } from './SidebarFooter'

export interface DashboardSidebarProps {
  expanded?: boolean
  setExpanded: (expanded: boolean) => void
  container?: Element
}

export default function DashboardSidebar({
  expanded = true,
  setExpanded,
  container,
}: DashboardSidebarProps) {
  const theme = useTheme()
  useLocation() // re-render on navigation

  const isOverSmViewport = useMediaQuery(theme.breakpoints.up('sm'))
  const isOverMdViewport = useMediaQuery(theme.breakpoints.up('md'))

  const [isFullyExpanded, setIsFullyExpanded] = React.useState(expanded)
  const [isFullyCollapsed, setIsFullyCollapsed] = React.useState(!expanded)

  React.useEffect(() => {
    if (expanded) {
      const timeout = setTimeout(() => {
        setIsFullyExpanded(true)
      }, theme.transitions.duration.enteringScreen)
      return () => clearTimeout(timeout)
    }
    setIsFullyExpanded(false)
    return () => {}
  }, [expanded, theme.transitions.duration.enteringScreen])

  React.useEffect(() => {
    if (!expanded) {
      const timeout = setTimeout(() => {
        setIsFullyCollapsed(true)
      }, theme.transitions.duration.leavingScreen)
      return () => clearTimeout(timeout)
    }
    setIsFullyCollapsed(false)
    return () => {}
  }, [expanded, theme.transitions.duration.leavingScreen])

  const mini = !expanded

  const handleSetSidebarExpanded = React.useCallback(
    (newExpanded: boolean) => () => {
      setExpanded(newExpanded)
    },
    [setExpanded]
  )

  const handlePageItemClick = React.useCallback(
    (_itemId: string, hasNestedNavigation: boolean) => {
      if (!isOverSmViewport && !hasNestedNavigation) {
        setExpanded(false)
      }
    },
    [setExpanded, isOverSmViewport]
  )

  const hasDrawerTransitions = isOverSmViewport || isOverMdViewport

  const drawerContent = (
    <React.Fragment>
      <Toolbar />
      <Box
        component="nav"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'auto',
          overflowX: 'hidden',
          pt: !mini ? 0 : 2,
          ...(hasDrawerTransitions
            ? getDrawerSxTransitionMixin(isFullyExpanded, 'padding')
            : {}),
        }}
      >
        <Box>
          <SidebarNavItems mini={mini} />
        </Box>
        <SidebarFooter mini={mini} />
      </Box>
    </React.Fragment>
  )

  const getDrawerSharedSx = React.useCallback(
    (isTemporary: boolean) => {
      const drawerWidth = mini ? MINI_DRAWER_WIDTH : DRAWER_WIDTH

      return {
        displayPrint: 'none',
        width: drawerWidth,
        flexShrink: 0,
        ...getDrawerWidthTransitionMixin(expanded),
        ...(isTemporary ? { position: 'absolute' } : {}),
        [`& .MuiDrawer-paper`]: {
          position: 'absolute',
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundImage: 'none',
          ...getDrawerWidthTransitionMixin(expanded),
        },
      }
    },
    [expanded, mini]
  )

  const sidebarContextValue = React.useMemo(
    () => ({
      onPageItemClick: handlePageItemClick,
      mini,
      fullyExpanded: isFullyExpanded,
      fullyCollapsed: isFullyCollapsed,
      hasDrawerTransitions,
    }),
    [
      handlePageItemClick,
      mini,
      isFullyExpanded,
      isFullyCollapsed,
      hasDrawerTransitions,
    ]
  )

  return (
    <DashboardSidebarContext.Provider value={sidebarContextValue}>
      {/* Mobile drawer */}
      <Drawer
        container={container}
        variant="temporary"
        open={expanded}
        onClose={handleSetSidebarExpanded(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none', md: 'none' },
          ...getDrawerSharedSx(true),
        }}
      >
        {drawerContent}
      </Drawer>
      {/* Tablet drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block', md: 'none' },
          ...getDrawerSharedSx(false),
        }}
      >
        {drawerContent}
      </Drawer>
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          ...getDrawerSharedSx(false),
        }}
      >
        {drawerContent}
      </Drawer>
    </DashboardSidebarContext.Provider>
  )
}
