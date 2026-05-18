import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { useNotesByTag } from '../../hooks/useNotes'
import { NotesList, Loader, EmptyState } from '../../components'

export const TaggedNotesPage = () => {
  const { tag } = useParams<{ tag: string }>()
  const { data: notes = [], isLoading } = useNotesByTag(tag ?? '')

  if (isLoading) return <Loader />

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        #{tag}
      </Typography>
      <NotesList
        notes={notes}
        onPin={undefined}
        onDelete={undefined}
        emptyState={<EmptyState message={`No notes tagged #${tag}`} />}
      />
    </Box>
  )
}
