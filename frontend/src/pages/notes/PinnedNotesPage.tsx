import { useState } from 'react'
import { MOCK_NOTES } from '../../mock/notes'
import type { Note } from '../../types/note'

import { NoteCard } from '../../components'
import { EmptyState } from '../../components'
import { Box, Grid, Typography } from '@mui/material'

import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'

export const PinnedNotesPage = () => {
  const [notes, setNotes] = useState<Note[]>(
    MOCK_NOTES.filter((n) => n.isPinned && !n.isDeleted)
  )

  const handlePin = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  const handleDelete = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  if (notes.length === 0) {
    return (
      <EmptyState
        message="No pinned notes yet"
        icon={
          <PushPinOutlinedIcon sx={{ fontSize: 64, color: 'text.disabled' }} />
        }
      />
    )
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Pinned Notes
      </Typography>
      <Grid container spacing={2}>
        {notes.map((note) => (
          <Grid key={note.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <NoteCard note={note} onPin={handlePin} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
