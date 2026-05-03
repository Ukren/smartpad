import { Grid } from '@mui/material'
import type { Note } from '../types/note'
import { NoteCard } from './NoteCard'
import { EmptyState } from './EmptyState'

type NotesListProps = {
  notes: Note[]
  onPin?: (id: string) => void
  onDelete?: (id: string) => void
  emptyState?: React.ReactNode
  actions?: (note: Note) => React.ReactNode
}

export const NotesList = ({
  notes,
  onPin,
  onDelete,
  emptyState = <EmptyState message="No notes found" />,
  actions,
}: NotesListProps): React.ReactNode => {
  if (notes.length === 0) {
    return emptyState
  }

  return (
    <Grid container spacing={2}>
      {notes.map((note) => (
        <Grid key={note.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <NoteCard
            note={note}
            onPin={onPin}
            onDelete={onDelete}
            actions={actions ? actions(note) : undefined}
          />
        </Grid>
      ))}
    </Grid>
  )
}
