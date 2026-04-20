import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material'
import { LogoutOutlined } from '@mui/icons-material'

const MOCK_USER = { email: 'example@email.com', name: 'Demo User' }

export const SidebarFooter = () => {
  const initials = MOCK_USER.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()

  return (
    <Box sx={{ mt: 'auto' }}>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 1.5,
        }}
      >
        <Avatar sx={{ width: 32, height: 32, fontSize: 13 }}>{initials}</Avatar>
        <Box>
          <Typography variant="body2" noWrap>
            {MOCK_USER.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {MOCK_USER.email}
          </Typography>
        </Box>
        <Tooltip title="Logout">
          <IconButton size="small">
            <LogoutOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}
