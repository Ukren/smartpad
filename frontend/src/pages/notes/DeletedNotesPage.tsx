import { useState } from 'react'
import type { Note } from '../../types/note'
import { MOCK_NOTES } from '../../mock/notes'

import { ConfirmDialog, EmptyState, NotesList } from '../../components'
import { Box, Button, Typography } from '@mui/material'

import { DeleteForeverOutlined, RestoreOutlined } from '@mui/icons-material'

export const DeletedNotesPage = () => {
  const [notes, setNotes] = useState<Note[]>(
    MOCK_NOTES.filter((note) => note.isDeleted)
  )
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)

  const handleRestore = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id))
  }

  const handlePermanentDelete = () => {
    setNotes((prev) => prev.filter((note) => note.id !== deleteTargetId))
    setDeleteTargetId(null)
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Deleted Notes
      </Typography>

      <NotesList
        notes={notes}
        emptyState={<EmptyState message="Trash is empty" />}
        onPin={undefined}
        onDelete={undefined}
        actions={(note) => (
          <>
            <Button
              size="small"
              startIcon={<RestoreOutlined />}
              onClick={() => handleRestore(note.id)}
            >
              Restore
            </Button>
            <Button
              size="small"
              startIcon={<DeleteForeverOutlined />}
              onClick={() => setDeleteTargetId(note.id)}
            >
              Delete
            </Button>
          </>
        )}
      />

      <ConfirmDialog
        open={deleteTargetId !== null}
        title="Delete permanently?"
        message="This note will be deleted permanently and cannot be recovered"
        confirmLabel="Delete permanently"
        onConfirm={handlePermanentDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </Box>
  )
}
