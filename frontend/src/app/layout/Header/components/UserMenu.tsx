import { useState } from 'react'
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'
import { LogoutOutlined } from '@mui/icons-material'

const MOCK_USER = { name: 'Demo User', email: 'example@email.com' }

export const UserMenu = () => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null)

  const initials = MOCK_USER.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()

  return (
    <>
      <Tooltip title="Account">
        <IconButton onClick={(e) => setAnchor(e.currentTarget)} size="small">
          <Avatar sx={{ width: 32, height: 32, fontSize: 13 }}>
            {initials}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {MOCK_USER.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {MOCK_USER.email}
          </Typography>
        </Box>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <LogoutOutlined fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}
