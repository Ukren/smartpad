import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { SIDEBAR_WIDTH } from '../const/sidebar'

import { ThemeToggle } from './components/ThemeToggle'
import { SearchInput } from './components/SearchInput'
import { UserMenu } from './components/UserMenu'

export const Header = () => (
  <AppBar
    position="static"
    elevation={1}
    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
  >
    <Toolbar>
      <Typography variant="h6" sx={{ width: SIDEBAR_WIDTH, flexShrink: 0 }}>
        Smartpad
      </Typography>
      <SearchInput />

      <Box sx={{ flex: 1 }} />

      <ThemeToggle />
      <UserMenu />
    </Toolbar>
  </AppBar>
)
