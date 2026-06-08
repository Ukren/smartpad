import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import { usePinnedNotes, useSoftDeleteNote } from '../../hooks/useNotes'
import {
  EmptyState,
  Loader,
  NoteListView,
  PageContainer,
} from '../../components'
import type { Note } from '../../types/note'

export const PinnedNotesPage = () => {
  const navigate = useNavigate()
  const { data: notes = [], isLoading, isError, error } = usePinnedNotes()
  const softDelete = useSoftDeleteNote()

  const renderActions = React.useCallback(
    (note: Note) => (
      <>
        <Tooltip title="Edit">
          <IconButton
            size="small"
            onClick={() => navigate(`/notes/${note.id}/edit`)}
          >
            <EditOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton size="small" onClick={() => softDelete.mutate(note.id)}>
            <DeleteOutlineIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </>
    ),
    [navigate, softDelete]
  )

  return (
    <PageContainer
      breadcrumbs={[
        { title: 'All Notes', path: '/notes' },
        { title: 'Pinned Notes' },
      ]}
    >
      <Typography variant="h1" sx={{ mb: 3 }}>
        Pinned Notes
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
          renderActions={renderActions}
          emptyState={<EmptyState message="No pinned notes yet" />}
        />
      )}
    </PageContainer>
  )
}
