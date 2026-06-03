import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useNote, useTogglePin, useSoftDeleteNote } from '../../hooks/useNotes'

import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import {
  ConfirmDialog,
  EmptyState,
  Loader,
  MarkdownPreview,
} from '../../components'
import { PageContainer } from '../../components/PageContainer'

import {
  ArrowBack,
  EditOutlined,
  DeleteOutlined,
  PushPin,
  PushPinOutlined,
} from '@mui/icons-material'

export const NoteViewPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: note, isLoading, isError } = useNote(id!)
  const togglePin = useTogglePin()
  const softDelete = useSoftDeleteNote()
  const [deleteOpen, setDeleteOpen] = useState(false)

  if (isLoading) return <Loader />
  if (isError || !note) return <EmptyState message="Note not found" />

  const handlePin = () => {
    togglePin.mutate({ id: note.id, isPinned: !note.isPinned })
  }

  const handleConfirmDelete = () => {
    softDelete.mutate(note.id, {
      onSuccess: () => {
        setDeleteOpen(false)
        navigate('/notes')
      },
    })
  }

  return (
    <PageContainer
      breadcrumbs={[{ title: 'Notes', path: '/notes' }, { title: note.title }]}
      actions={
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Edit note">
            <IconButton onClick={() => navigate(`/notes/${note.id}/edit`)}>
              <EditOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title={note.isPinned ? 'Unpin' : 'Pin'}>
            <IconButton onClick={handlePin}>
              {note.isPinned ? <PushPin /> : <PushPinOutlined />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete note">
            <IconButton color="error" onClick={() => setDeleteOpen(true)}>
              <DeleteOutlined />
            </IconButton>
          </Tooltip>
        </Stack>
      }
    >
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/notes')}
        size="small"
        sx={{ mb: 2, alignSelf: 'flex-start' }}
      >
        Back
      </Button>

      <Typography
        variant="caption"
        color="text.disabled"
        sx={{ mb: 1, display: 'block' }}
      >
        Last updated {new Date(note.updatedAt).toLocaleDateString()}
      </Typography>

      {note.tags.length > 0 && (
        <Stack direction="row" spacing={0.5} sx={{ mb: 2, flexWrap: 'wrap' }}>
          {note.tags.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.name}
              size="small"
              variant="outlined"
            />
          ))}
        </Stack>
      )}

      <Divider sx={{ mb: 3 }} />

      <MarkdownPreview content={note.content} />

      <ConfirmDialog
        open={deleteOpen}
        title="Delete note"
        message={`"${note.title}" will be moved to trash. You can restore it from Deleted Notes.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </PageContainer>
  )
}
