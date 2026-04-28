import { useNavigate } from 'react-router-dom'
import type { Note } from '../types/note'
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from '@mui/material'

import { DeleteOutlined, PushPin, PushPinOutlined } from '@mui/icons-material'

type NoteCardProps = {
  note: Note
  onPin: (id: string) => void
  onDelete: (id: string) => void
}

const stripMarkdown = (text: string) =>
  text.replace(/[#*_`[\]]/g, '').slice(0, 120)

export const NoteCard = ({
  note,
  onPin,
  onDelete,
}: NoteCardProps): React.ReactNode => {
  const navigate = useNavigate()

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea
        sx={{ flexGrow: 1 }}
        onClick={() => navigate(`/notes/${note.id}`)}
      >
        <CardContent>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }} noWrap>
            {note.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {stripMarkdown(note.content)}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
            {note.tags.map((tag) => (
              <Chip key={tag.id} label={tag.name} size="small" />
            ))}
          </Box>

          <Typography
            variant="caption"
            color="text.disabled"
            sx={{ mt: 1, display: 'block' }}
          >
            {new Date(note.updatedAt).toLocaleDateString()}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
        <IconButton
          size="small"
          title={note.isPinned ? 'Unpin' : 'Pin'}
          onClick={(e) => {
            e.stopPropagation()
            onPin(note.id)
          }}
        >
          {note.isPinned ? (
            <PushPin fontSize="small" />
          ) : (
            <PushPinOutlined fontSize="small" />
          )}
        </IconButton>

        <IconButton
          size="small"
          color="error"
          title="Delete"
          onClick={(e) => {
            e.stopPropagation()
            onDelete(note.id)
          }}
        >
          <DeleteOutlined fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  )
}
