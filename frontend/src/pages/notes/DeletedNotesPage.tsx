import * as React from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Alert from '@mui/material/Alert'
import { DataGrid, GridActionsCellItem, gridClasses } from '@mui/x-data-grid'
import type { GridColDef } from '@mui/x-data-grid'
import RefreshIcon from '@mui/icons-material/Refresh'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import RestoreIcon from '@mui/icons-material/Restore'
import {
  useDeletedNotes,
  useDeleteNote,
  useRestoreNote,
} from '../../hooks/useNotes'
import { ConfirmDialog } from '../../components'
import { PageContainer } from '../../components/PageContainer'
import type { Note } from '../../types/note'

export const DeletedNotesPage = () => {
  const {
    data: notes = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useDeletedNotes()
  const deleteNote = useDeleteNote()
  const restoreNote = useRestoreNote()
  const [deleteTargetId, setDeleteTargetId] = React.useState<string | null>(
    null
  )

  const handleRefresh = React.useCallback(() => {
    refetch()
  }, [refetch])

  const handleRestore = React.useCallback(
    (note: Note) => () => {
      restoreNote.mutate(note.id)
    },
    [restoreNote]
  )

  const handlePermanentDeleteClick = React.useCallback(
    (note: Note) => () => {
      setDeleteTargetId(note.id)
    },
    []
  )

  const handlePermanentDelete = () => {
    if (deleteTargetId) deleteNote.mutate(deleteTargetId)
    setDeleteTargetId(null)
  }

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
        field: 'createdAt',
        headerName: 'Created',
        type: 'date',
        width: 120,
        valueGetter: (value) => value && new Date(value),
      },
      {
        field: 'updatedAt',
        headerName: 'Deleted',
        type: 'date',
        width: 120,
        valueGetter: (value) => value && new Date(value),
      },
      {
        field: 'actions',
        type: 'actions',
        width: 100,
        align: 'right',
        getActions: ({ row }) => [
          <GridActionsCellItem
            key="restore-item"
            icon={<RestoreIcon />}
            label="Restore"
            onClick={handleRestore(row)}
          />,
          <GridActionsCellItem
            key="delete-item"
            icon={<DeleteForeverIcon />}
            label="Delete permanently"
            onClick={handlePermanentDeleteClick(row)}
          />,
        ],
      },
    ],
    [handleRestore, handlePermanentDeleteClick]
  )

  const pageTitle = 'Deleted Notes'

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

      <ConfirmDialog
        open={deleteTargetId !== null}
        title="Delete permanently?"
        message="This note will be deleted permanently and cannot be recovered"
        confirmLabel="Delete permanently"
        onConfirm={handlePermanentDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </PageContainer>
  )
}
