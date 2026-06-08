import { useLocation, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import { useNotes, useCreateNote } from '../../../hooks/useNotes'
import { useDashboardLayout } from '../context/DashboardLayoutContext'
import { palette } from '../../../theme/tokens'
import { SidebarItem } from './SidebarItem'
import { SidebarSectionLabel } from './SidebarSectionLabel'

export const SidebarPrivateNotes = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { isMobile, setSidebarOpen } = useDashboardLayout()
  const { data: notes = [], isLoading } = useNotes()
  const createNote = useCreateNote()

  const closeOnMobile = () => {
    if (isMobile) setSidebarOpen(false)
  }

  const handleCreate = async () => {
    const note = await createNote.mutateAsync({
      title: 'Untitled',
      content: '',
      tags: [],
    })
    navigate(`/notes/${note.id}/edit`)
    closeOnMobile()
  }

  return (
    <Box>
      <SidebarSectionLabel
        label="Private"
        trailing={
          <Tooltip title="New note">
            <IconButton size="small" onClick={handleCreate} sx={{ p: 0.25 }}>
              <AddIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        }
      />

      {isLoading ? (
        <MutedRow text="Loading…" />
      ) : notes.length === 0 ? (
        <MutedRow text="No notes inside" />
      ) : (
        notes.map((note) => (
          <SidebarItem
            key={note.id}
            href={`/notes/${note.id}`}
            onClick={closeOnMobile}
            icon={<InsertDriveFileOutlinedIcon />}
            label={note.title || 'Untitled'}
            depth={1}
            selected={pathname === `/notes/${note.id}`}
          />
        ))
      )}
    </Box>
  )
}

const MutedRow = ({ text }: { text: string }) => (
  <Box
    sx={(t) => ({
      pl: '24px',
      py: '4px',
      fontSize: '14px',
      color: palette.textTertiary,
      ...t.applyStyles('dark', { color: palette.textTertiaryDark }),
    })}
  >
    {text}
  </Box>
)
