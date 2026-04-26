import { EmptyState } from '../../components'
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined'

export const PinnedNotesPage = () => {
  return (
    <EmptyState
      message="No pinned notes yet"
      icon={<NoteOutlinedIcon sx={{ fontSize: 64, color: 'text.disabled' }} />}
    />
  )
}
