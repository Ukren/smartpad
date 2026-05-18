import { useSearchParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { useNotes, useTogglePin, useSoftDeleteNote } from '../../hooks/useNotes'
import { NotesList, Loader } from '../../components'

export const NotesListPage = () => {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') ?? undefined

  const { data: notes = [], isLoading } = useNotes(search)
  const togglePin = useTogglePin()
  const softDelete = useSoftDeleteNote()

  if (isLoading) return <Loader />

  const handlePin = (id: string) => {
    const note = notes.find((n) => n.id === id)
    if (note) togglePin.mutate({ id, isPinned: !note.isPinned })
  }

  const handleDelete = (id: string) => {
    softDelete.mutate(id)
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        All Notes
      </Typography>
      <NotesList notes={notes} onPin={handlePin} onDelete={handleDelete} />
    </Box>
  )
}
