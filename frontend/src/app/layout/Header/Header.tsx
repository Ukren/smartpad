import { AppBar, Toolbar, Typography } from '@mui/material'

import { ThemeToggle } from './components/ThemeToggle'

interface HeaderProps {
  sidebarWidth: number
}

export const Header = ({ sidebarWidth }: HeaderProps) => (
  <AppBar
    position="static"
    elevation={1}
    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
  >
    <Toolbar>
      <Typography variant="h6" sx={{ width: sidebarWidth, flexShrink: 0 }}>
        Smartpad
      </Typography>
      <ThemeToggle />
    </Toolbar>
  </AppBar>
)
