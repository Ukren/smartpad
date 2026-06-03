import * as React from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Alert from '@mui/material/Alert'
import { DataGrid, GridActionsCellItem, gridClasses } from '@mui/x-data-grid'
import type { GridColDef } from '@mui/x-data-grid'
import RefreshIcon from '@mui/icons-material/Refresh'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import { usePinnedNotes, useSoftDeleteNote } from '../../hooks/useNotes'
import { PageContainer } from '../../components/PageContainer'
import type { Note } from '../../types/note'

export const PinnedNotesPage = () => {
  const navigate = useNavigate()
  const {
    data: notes = [],
    isLoading,
    isError,
    error,
    refetch,
  } = usePinnedNotes()
  const softDelete = useSoftDeleteNote()

  const handleRefresh = React.useCallback(() => {
    refetch()
  }, [refetch])

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
    [handleRowEdit, handleRowDelete]
  )

  const pageTitle = 'Pinned Notes'

  return (
    <PageContainer
      breadcrumbs={[{ title: 'Notes', path: '/notes' }, { title: pageTitle }]}
      actions={
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
