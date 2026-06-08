import * as React from 'react'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import RestoreIcon from '@mui/icons-material/Restore'
import {
  useDeletedNotes,
  useDeleteNote,
  useRestoreNote,
} from '../../hooks/useNotes'
import {
  ConfirmDialog,
  EmptyState,
  Loader,
  NoteListView,
  PageContainer,
} from '../../components'
import type { Note } from '../../types/note'

export const DeletedNotesPage = () => {
  const { data: notes = [], isLoading, isError, error } = useDeletedNotes()
  const deleteNote = useDeleteNote()
  const restoreNote = useRestoreNote()
  const [deleteTargetId, setDeleteTargetId] = React.useState<string | null>(
    null
  )

  const handlePermanentDelete = () => {
    if (deleteTargetId) deleteNote.mutate(deleteTargetId)
    setDeleteTargetId(null)
  }

  const renderActions = React.useCallback(
    (note: Note) => (
      <>
        <Tooltip title="Restore">
          <IconButton size="small" onClick={() => restoreNote.mutate(note.id)}>
            <RestoreIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete permanently">
          <IconButton size="small" onClick={() => setDeleteTargetId(note.id)}>
            <DeleteForeverIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </>
    ),
    [restoreNote]
  )

  return (
    <PageContainer breadcrumbs={[{ title: 'Trash' }]}>
      <Typography variant="h1" sx={{ mb: 3 }}>
        Trash
      </Typography>

      {isError ? (
        <Alert severity="error">
          {(error as Error)?.message ?? 'Failed to load notes'}
        </Alert>
      ) : isLoading ? (
        <Loader />
      ) : (
        <NoteListView
          notes={notes}
          onRowClick={() => {}}
          renderActions={renderActions}
          emptyState={<EmptyState message="Trash is empty" />}
        />
      )}

      <ConfirmDialog
        open={deleteTargetId !== null}
        title="Delete permanently?"
        message="This note will be deleted permanently and cannot be recovered"
        confirmLabel="Delete permanently"
        onConfirm={handlePermanentDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </PageContainer>
  )
}
