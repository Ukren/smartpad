import { Box, Typography } from '@mui/material'
import { MOCK_NOTES } from '../../mock/notes'

export const NotesListPage = () => {
  return (
    <Box>
      {MOCK_NOTES.map((note) => (
        <Box key={note.id}>
          <Typography variant="h6">{note.title}</Typography>
          <Typography variant="body2">{note.content}</Typography>
        </Box>
      ))}
    </Box>
  )
}
