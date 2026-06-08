import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import EditNoteIcon from '@mui/icons-material/EditNote'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { useCurrentUser, useLogout } from '../../../hooks/useAuth'
import { useDashboardLayout } from '../context/DashboardLayoutContext'
import { useCreateNote } from '../../../hooks/useNotes'
import { palette } from '../../../theme/tokens'

export const SidebarWorkspaceHeader = () => {
  const navigate = useNavigate()
  const { data: user } = useCurrentUser()
  const logout = useLogout()
  const createNote = useCreateNote()
  const { setSidebarOpen, isMobile } = useDashboardLayout()
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null)

  const name = user?.name ?? 'Workspace'
  const initials = (user?.name ?? '?')
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()

  const handleNewNote = async () => {
    const note = await createNote.mutateAsync({
      title: 'Untitled',
      content: '',
      tags: [],
    })
    navigate(`/notes/${note.id}/edit`)
    if (isMobile) setSidebarOpen(false)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: '8px',
        py: '6px',
        '&:hover .workspace-actions': { opacity: 1 },
      }}
    >
      <ButtonBase
        disableRipple
        onClick={(e) => setAnchor(e.currentTarget)}
        sx={(t) => ({
          flex: 1,
          minWidth: 0,
          justifyContent: 'flex-start',
          gap: 1,
          px: '6px',
          py: '4px',
          borderRadius: '6px',
          '&:hover': {
            backgroundColor: palette.hover,
            ...t.applyStyles('dark', { backgroundColor: palette.hoverDark }),
          },
        })}
      >
        <Avatar
          variant="rounded"
          sx={{
            width: 22,
            height: 22,
            fontSize: 12,
            fontWeight: 600,
            bgcolor: palette.blue,
            borderRadius: '5px',
          }}
        >
          {initials}
        </Avatar>
        <Typography
          sx={(t) => ({
            fontSize: '14px',
            fontWeight: 600,
            color: palette.text,
            ...t.applyStyles('dark', { color: palette.textDark }),
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          })}
        >
          {name}
        </Typography>
        <UnfoldMoreIcon
          sx={(t) => ({
            fontSize: 16,
            color: palette.icon,
            ...t.applyStyles('dark', { color: palette.iconDark }),
          })}
        />
      </ButtonBase>

      <Box
        className="workspace-actions"
        sx={{
          display: 'flex',
          gap: 0.25,
          opacity: { xs: 1, md: 0 },
          transition: 'opacity 60ms ease-in',
        }}
      >
        <Tooltip title="New note">
          <IconButton size="small" onClick={handleNewNote}>
            <EditNoteIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Close sidebar">
          <IconButton size="small" onClick={() => setSidebarOpen(false)}>
            <KeyboardDoubleArrowLeftIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        slotProps={{ paper: { sx: { minWidth: 220 } } }}
      >
        <Box sx={{ px: 1.5, py: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {user?.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={() => {
            setAnchor(null)
            navigate('/change-password')
          }}
        >
          <ListItemIcon>
            <LockOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Change password
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchor(null)
            logout.mutate()
          }}
        >
          <ListItemIcon>
            <LogoutOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Log out
        </MenuItem>
      </Menu>
    </Box>
  )
}
