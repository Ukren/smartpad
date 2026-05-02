import { useState } from 'react'
import type { Note } from '../../types/note'
import { MOCK_NOTES } from '../../mock/notes'

import { ConfirmDialog, EmptyState, NoteCard } from '../../components'
import { Box, Button, Grid, Typography } from '@mui/material'

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

      {notes.length === 0 ? (
        <EmptyState message="Trash is empty" />
      ) : (
        <Grid>
          {notes.map((note) => (
            <Grid key={note.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <NoteCard
                note={note}
                actions={
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
                }
              ></NoteCard>
            </Grid>
          ))}
        </Grid>
      )}

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
