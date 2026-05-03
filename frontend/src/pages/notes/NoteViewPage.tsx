import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MOCK_NOTES } from '../../mock/notes'
import type { Note } from '../../types/note'

import {
  Box,
  Button,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material'

import { ConfirmDialog, EmptyState, MarkdownPreview } from '../../components'

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

  const [note, setNote] = useState<Note | undefined>(
    MOCK_NOTES.find((n) => n.id === id)
  )
  const [deleteOpen, setDeleteOpen] = useState(false)
  if (!note) {
    return <EmptyState message="Note not found" />
  }

  const handlePin = () => {
    setNote((prev) => prev && { ...prev, isPinned: !prev.isPinned })
  }

  const handleConfirmDelete = () => {
    setDeleteOpen(false)
    navigate('/notes')
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 2,
        }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/notes')}
          size="small"
        >
          Back
        </Button>

        <Box sx={{ flexGrow: 1 }} />
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
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h4" sx={{ mb: 1 }}>
        {note.title}
      </Typography>

      <Typography
        variant="caption"
        color="text.disabled"
        sx={{ mb: 3, display: 'block' }}
      >
        Last updated {new Date(note.updatedAt).toLocaleDateString()}
      </Typography>

      <MarkdownPreview content={note.content} />

      <ConfirmDialog
        open={deleteOpen}
        title="Delete note"
        message={`"${note.title}" will be moved to trash. You can restore it from Deleted Notes.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </Box>
  )
}
