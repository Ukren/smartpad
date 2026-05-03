import { useState } from 'react'
import { MOCK_NOTES } from '../../mock/notes'
import type { Note } from '../../types/note'

import { EmptyState, NotesList } from '../../components'
import { Box, Typography } from '@mui/material'

import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'

export const PinnedNotesPage = () => {
  const [notes, setNotes] = useState<Note[]>(
    MOCK_NOTES.filter((n) => n.isPinned && !n.isDeleted)
  )

  const removeFromList = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Pinned Notes
      </Typography>
      <NotesList
        notes={notes}
        onPin={removeFromList}
        onDelete={removeFromList}
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
