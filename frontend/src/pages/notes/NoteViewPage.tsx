import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { MOCK_NOTES } from '../../mock/notes'
import { MarkdownPreview } from '../../components/MarkdownPreview'

export const NoteViewPage = () => {
  const { id } = useParams<{ id: string }>()
  const note = MOCK_NOTES.find((n) => n.id === id)

  if (!note) {
    return <Typography color="text.secondary">Note not found.</Typography>
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {note.title}
      </Typography>
      <MarkdownPreview content={note.content} />
    </Box>
  )
}
