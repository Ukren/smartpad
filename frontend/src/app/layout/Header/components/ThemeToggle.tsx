import { useColorScheme } from '@mui/material/styles'

import { IconButton, Tooltip } from '@mui/material'

import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material'

export const ThemeToggle = () => {
  const { mode, setMode } = useColorScheme()

  return (
    <Tooltip title={mode === 'dark' ? 'Light mode' : 'Dark mode'}>
      <IconButton
        onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
        color="inherit"
      >
        {mode === 'dark' ? <LightModeOutlined /> : <DarkModeOutlined />}
      </IconButton>
    </Tooltip>
  )
}
