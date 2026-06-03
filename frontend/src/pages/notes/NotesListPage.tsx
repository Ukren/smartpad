import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Alert from '@mui/material/Alert'
import { DataGrid, GridActionsCellItem, gridClasses } from '@mui/x-data-grid'
import type { GridColDef } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import RefreshIcon from '@mui/icons-material/Refresh'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PushPinIcon from '@mui/icons-material/PushPin'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useNotes, useTogglePin, useSoftDeleteNote } from '../../hooks/useNotes'
import { PageContainer } from '../../components/PageContainer'
import type { Note } from '../../types/note'

export const NotesListPage = () => {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') ?? undefined
  const navigate = useNavigate()

  const {
    data: notes = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useNotes(search)
  const togglePin = useTogglePin()
  const softDelete = useSoftDeleteNote()

  const handleRefresh = React.useCallback(() => {
    refetch()
  }, [refetch])

  const handleCreateClick = React.useCallback(() => {
    navigate('/notes/new')
  }, [navigate])

  const handleRowClick = React.useCallback(
    (params: { row: Note }) => {
      navigate(`/notes/${params.row.id}`)
    },
    [navigate]
  )

  const handleRowEdit = React.useCallback(
    (note: Note) => () => {
      navigate(`/notes/${note.id}/edit`)
    },
    [navigate]
  )

  const handleRowPin = React.useCallback(
    (note: Note) => () => {
      togglePin.mutate({ id: note.id, isPinned: !note.isPinned })
    },
    [togglePin]
  )

  const handleRowDelete = React.useCallback(
    (note: Note) => () => {
      softDelete.mutate(note.id)
    },
    [softDelete]
  )

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: 'rowNumber',
        headerName: 'ID',
        width: 60,
        sortable: false,
        filterable: false,
        renderCell: (params) =>
          params.api.getAllRowIds().indexOf(params.id) + 1,
      },
      { field: 'title', headerName: 'Title', flex: 1, minWidth: 200 },
      {
        field: 'tags',
        headerName: 'Tags',
        width: 200,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ alignItems: 'center', height: '100%', flexWrap: 'wrap' }}
          >
            {(params.value as Note['tags'])?.slice(0, 3).map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                size="small"
                variant="outlined"
              />
            ))}
            {(params.value as Note['tags'])?.length > 3 && (
              <Chip
                label={`+${(params.value as Note['tags']).length - 3}`}
                size="small"
              />
            )}
          </Stack>
        ),
      },
      {
        field: 'createdAt',
        headerName: 'Created',
        type: 'date',
        width: 120,
        valueGetter: (value) => value && new Date(value),
      },
      {
        field: 'isPinned',
        headerName: 'Pinned',
        width: 80,
        renderCell: (params) => (
          <GridActionsCellItem
            icon={params.value ? <PushPinIcon /> : <PushPinOutlinedIcon />}
            label={params.value ? 'Unpin' : 'Pin'}
            onClick={(e) => {
              e.stopPropagation()
              handleRowPin(params.row)()
            }}
          />
        ),
      },
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        align: 'right',
        getActions: ({ row }) => [
          <GridActionsCellItem
            key="edit-item"
            icon={<EditIcon />}
            label="Edit"
            onClick={handleRowEdit(row)}
          />,
          <GridActionsCellItem
            key="delete-item"
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleRowDelete(row)}
          />,
        ],
      },
    ],
    [handleRowEdit, handleRowDelete, handleRowPin]
  )

  const pageTitle = 'Notes'

  return (
    <PageContainer
      breadcrumbs={[{ title: pageTitle }]}
      actions={
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Tooltip title="Reload data" placement="right" enterDelay={1000}>
            <div>
              <IconButton
                size="small"
                aria-label="refresh"
                onClick={handleRefresh}
              >
                <RefreshIcon />
              </IconButton>
            </div>
          </Tooltip>
          <Button
            variant="contained"
            onClick={handleCreateClick}
            startIcon={<AddIcon />}
          >
            New Note
          </Button>
        </Stack>
      }
    >
      <Box sx={{ flex: 1, width: '100%' }}>
        {isError ? (
          <Alert severity="error">
            {(error as Error)?.message ?? 'Failed to load notes'}
          </Alert>
        ) : (
          <DataGrid
            rows={notes}
            columns={columns}
            loading={isLoading}
            disableRowSelectionOnClick
            onRowClick={handleRowClick}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: { paginationModel: { pageSize: 25 } },
            }}
            showToolbar
            sx={{
              [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
                outline: 'transparent',
              },
              [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
                {
                  outline: 'none',
                },
              [`& .${gridClasses.row}:hover`]: {
                cursor: 'pointer',
              },
            }}
            slotProps={{
              loadingOverlay: {
                variant: 'circular-progress',
                noRowsVariant: 'circular-progress',
              },
              baseIconButton: {
                size: 'small',
              },
            }}
          />
        )}
      </Box>
    </PageContainer>
  )
}
