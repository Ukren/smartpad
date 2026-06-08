import * as React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import PushPinIcon from '@mui/icons-material/PushPin'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'
import {
  useNotesByTag,
  useTogglePin,
  useSoftDeleteNote,
} from '../../hooks/useNotes'
import {
  EmptyState,
  Loader,
  NoteListView,
  PageContainer,
} from '../../components'
import type { Note } from '../../types/note'

export const TaggedNotesPage = () => {
  const { tag } = useParams<{ tag: string }>()
  const navigate = useNavigate()
  const {
    data: notes = [],
    isLoading,
    isError,
    error,
  } = useNotesByTag(tag ?? '')
  const togglePin = useTogglePin()
  const softDelete = useSoftDeleteNote()

  const renderActions = React.useCallback(
    (note: Note) => (
      <>
        <Tooltip title={note.isPinned ? 'Unpin' : 'Pin'}>
          <IconButton
            size="small"
            onClick={() =>
              togglePin.mutate({ id: note.id, isPinned: !note.isPinned })
            }
          >
            {note.isPinned ? (
              <PushPinIcon sx={{ fontSize: 18 }} />
            ) : (
              <PushPinOutlinedIcon sx={{ fontSize: 18 }} />
            )}
          </IconButton>
        </Tooltip>
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
    [navigate, togglePin, softDelete]
  )

  return (
    <PageContainer
      breadcrumbs={[
        { title: 'All Notes', path: '/notes' },
        { title: `#${tag}` },
      ]}
    >
      <Typography variant="h1" sx={{ mb: 3 }}>
        #{tag}
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
          emptyState={<EmptyState message={`No notes tagged "${tag}"`} />}
        />
      )}
    </PageContainer>
  )
}
