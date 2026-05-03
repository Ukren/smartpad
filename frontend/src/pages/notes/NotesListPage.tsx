import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { MOCK_NOTES } from '../../mock/notes'
import { NotesList } from '../../components'
import type { Note } from '../../types/note'

export const NotesListPage = () => {
  const [notes, setNotes] = useState<Note[]>(
    MOCK_NOTES.filter((n) => !n.isDeleted)
  )

  const handlePin = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n))
    )
  }

  const handleDelete = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        All Notes
      </Typography>
      <NotesList notes={notes} onPin={handlePin} onDelete={handleDelete} />
    </Box>
  )
}
