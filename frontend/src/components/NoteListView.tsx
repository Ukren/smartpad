import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import type { Note } from '../types/note'
import { palette } from '../theme/tokens'
import { EmptyState } from './EmptyState'

interface NoteListViewProps {
  notes: Note[]
  onRowClick?: (note: Note) => void
  renderActions?: (note: Note) => React.ReactNode
  hideDate?: boolean
  emptyState?: React.ReactNode
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })

export const NoteListView = ({
  notes,
  onRowClick,
  renderActions,
  hideDate = false,
  emptyState = <EmptyState message="No notes inside" />,
}: NoteListViewProps) => {
  const navigate = useNavigate()

  if (notes.length === 0) {
    return <>{emptyState}</>
  }

  const handleClick = (note: Note) => {
    if (onRowClick) onRowClick(note)
    else navigate(`/notes/${note.id}`)
  }

  return (
    <Box
      sx={(t) => ({
        borderTop: `1px solid ${palette.border}`,
        ...t.applyStyles('dark', {
          borderTop: `1px solid ${palette.borderDark}`,
        }),
      })}
    >
      {notes.map((note) => (
        <Box
          key={note.id}
          role="button"
          onClick={() => handleClick(note)}
          sx={(t) => ({
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            px: 1,
            py: '8px',
            cursor: 'pointer',
            borderBottom: `1px solid ${palette.border}`,
            ...t.applyStyles('dark', {
              borderBottom: `1px solid ${palette.borderDark}`,
            }),
            '&:hover': {
              backgroundColor: palette.hover,
              ...t.applyStyles('dark', { backgroundColor: palette.hoverDark }),
            },
            '&:hover .note-row-actions': { opacity: 1 },
            '&:hover .note-row-date': renderActions ? { opacity: 0 } : {},
          })}
        >
          <InsertDriveFileOutlinedIcon
            sx={(t) => ({
              fontSize: 18,
              flexShrink: 0,
              color: palette.icon,
              ...t.applyStyles('dark', { color: palette.iconDark }),
            })}
          />

          <Box
            component="span"
            sx={(t) => ({
              flex: 1,
              minWidth: 0,
              fontSize: '14px',
              fontWeight: 500,
              color: palette.text,
              ...t.applyStyles('dark', { color: palette.textDark }),
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            })}
          >
            {note.title || 'Untitled'}
          </Box>

          {note.tags.length > 0 && (
            <Box
              sx={{
                display: { xs: 'none', sm: 'flex' },
                gap: 0.5,
                flexShrink: 0,
              }}
            >
              {note.tags.slice(0, 3).map((tag) => (
                <Chip
                  key={tag.id}
                  label={tag.name}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          )}

          {!hideDate && (
            <Box
              className="note-row-date"
              sx={(t) => ({
                flexShrink: 0,
                fontSize: '12px',
                width: 56,
                textAlign: 'right',
                color: palette.textTertiary,
                transition: 'opacity 60ms ease-in',
                ...t.applyStyles('dark', { color: palette.textTertiaryDark }),
              })}
            >
              {formatDate(note.updatedAt)}
            </Box>
          )}

          {renderActions && (
            <Box
              className="note-row-actions"
              onClick={(e) => e.stopPropagation()}
              sx={{
                position: 'absolute',
                right: 4,
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: 0.25,
                opacity: 0,
                transition: 'opacity 60ms ease-in',
              }}
            >
              {renderActions(note)}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  )
}
