import {
  usePinnedNotes,
  useTogglePin,
  useSoftDeleteNote,
} from '../../hooks/useNotes'

import { EmptyState, NotesList, Loader } from '../../components'
import { Box, Typography } from '@mui/material'

import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'

export const PinnedNotesPage = () => {
  const { data: notes = [], isLoading } = usePinnedNotes()
  const togglePin = useTogglePin()
  const softDelete = useSoftDeleteNote()

  if (isLoading) return <Loader />

  const handlePin = (id: string) => {
    const note = notes.find((n) => n.id === id)
    if (note) togglePin.mutate({ id, isPinned: !note.isPinned })
  }

  const handleDelete = (id: string) => {
    softDelete.mutate(id)
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Pinned Notes
      </Typography>
      <NotesList
        notes={notes}
        onPin={handlePin}
        onDelete={handleDelete}
        emptyState={
          <EmptyState
            message="No pinned notes yet"
            icon={
              <PushPinOutlinedIcon
                sx={{ fontSize: 64, color: 'text.disabled' }}
              />
            }
          />
        }
      />
    </Box>
  )
}
