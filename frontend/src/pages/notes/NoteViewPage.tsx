import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useNote, useTogglePin, useSoftDeleteNote } from '../../hooks/useNotes'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
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

import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import PushPinIcon from '@mui/icons-material/PushPin'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'

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
      breadcrumbs={[
        { title: 'All Notes', path: '/notes' },
        { title: note.title || 'Untitled' },
      ]}
      actions={
        <Stack direction="row" spacing={0.25} sx={{ alignItems: 'center' }}>
          <Button
            size="small"
            startIcon={<EditOutlinedIcon sx={{ fontSize: 16 }} />}
            onClick={() => navigate(`/notes/${note.id}/edit`)}
            sx={{ color: 'text.secondary' }}
          >
            Edit
          </Button>
          <Tooltip title={note.isPinned ? 'Unpin' : 'Pin'}>
            <IconButton size="small" onClick={handlePin}>
              {note.isPinned ? (
                <PushPinIcon sx={{ fontSize: 18 }} />
              ) : (
                <PushPinOutlinedIcon sx={{ fontSize: 18 }} />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete note">
            <IconButton size="small" onClick={() => setDeleteOpen(true)}>
              <DeleteOutlineIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </Stack>
      }
    >
      <Typography variant="h1" sx={{ mb: 1 }}>
        {note.title || 'Untitled'}
      </Typography>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: 'block', mb: note.tags.length > 0 ? 1.5 : 3 }}
      >
        Last edited {new Date(note.updatedAt).toLocaleDateString()}
      </Typography>

      {note.tags.length > 0 && (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 3 }}>
          {note.tags.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.name}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>
      )}

      <MarkdownPreview content={note.content} />

      <ConfirmDialog
        open={deleteOpen}
        title="Delete note"
        message={`"${note.title}" will be moved to trash. You can restore it from Trash.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </PageContainer>
  )
}
