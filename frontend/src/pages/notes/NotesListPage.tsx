import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import PushPinIcon from '@mui/icons-material/PushPin'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'
import { useNotes, useTogglePin, useSoftDeleteNote } from '../../hooks/useNotes'
import { useDebounce } from '../../hooks/useDebounce'
import { Loader, NoteListView, PageContainer } from '../../components'
import { palette } from '../../theme/tokens'
import type { Note } from '../../types/note'

export const NotesListPage = () => {
  const navigate = useNavigate()
  const [query, setQuery] = React.useState('')
  const search = useDebounce(query, 300)

  const {
    data: notes = [],
    isLoading,
    isError,
    error,
  } = useNotes(search || undefined)
  const togglePin = useTogglePin()
  const softDelete = useSoftDeleteNote()

  const handleCreate = React.useCallback(() => {
    navigate('/notes/new')
  }, [navigate])

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
      breadcrumbs={[{ title: 'All Notes' }]}
      actions={
        <Button
          variant="contained"
          size="small"
          onClick={handleCreate}
          startIcon={<AddIcon />}
        >
          New
        </Button>
      }
    >
      <Typography variant="h1" sx={{ mb: 2 }}>
        All Notes
      </Typography>

      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search notes…"
        size="small"
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18 }} />
              </InputAdornment>
            ),
          },
        }}
        sx={(t) => ({
          mb: 2,
          '& .MuiOutlinedInput-root': {
            backgroundColor: palette.hover,
            borderRadius: '6px',
            '& fieldset': { border: 'none' },
            '&:hover fieldset': { border: 'none' },
            '&.Mui-focused fieldset': {
              border: `1px solid ${palette.blue}`,
            },
            ...t.applyStyles('dark', { backgroundColor: palette.hoverDark }),
          },
        })}
      />

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
          emptyState={
            <EmptyNotes onCreate={handleCreate} searching={Boolean(search)} />
          }
        />
      )}
    </PageContainer>
  )
}

const EmptyNotes = ({
  onCreate,
  searching,
}: {
  onCreate: () => void
  searching: boolean
}) => (
  <Box sx={{ py: 6, textAlign: 'center', color: 'text.secondary' }}>
    <Typography variant="body2" sx={{ mb: 2 }}>
      {searching
        ? 'No notes match your search.'
        : 'Your notes will appear here.'}
    </Typography>
    {!searching && (
      <Button
        variant="contained"
        size="small"
        startIcon={<AddIcon />}
        onClick={onCreate}
      >
        New note
      </Button>
    )}
  </Box>
)
