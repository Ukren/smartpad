import { useState } from 'react'
import {
  useDeletedNotes,
  useDeleteNote,
  useRestoreNote,
} from '../../hooks/useNotes'

import { ConfirmDialog, EmptyState, NotesList, Loader } from '../../components'
import { Box, Button, Typography } from '@mui/material'

import { DeleteForeverOutlined, RestoreOutlined } from '@mui/icons-material'

export const DeletedNotesPage = () => {
  const { data: notes = [], isLoading } = useDeletedNotes()
  const deleteNote = useDeleteNote()
  const restoreNote = useRestoreNote()
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)

  if (isLoading) return <Loader />

  const handleRestore = (id: string) => {
    restoreNote.mutate(id)
  }

  const handlePermanentDelete = () => {
    if (deleteTargetId) deleteNote.mutate(deleteTargetId)
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
