import * as React from 'react'
import ButtonBase from '@mui/material/ButtonBase'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import { palette } from '../../../theme/tokens'

export interface SidebarItemProps {
  label: React.ReactNode
  icon?: React.ReactNode
  href?: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  selected?: boolean
  depth?: number
  trailing?: React.ReactNode
  title?: string
}

export const SidebarItem = ({
  label,
  icon,
  href,
  onClick,
  selected = false,
  depth = 0,
  trailing,
  title,
}: SidebarItemProps) => {
  const linkProps = href
    ? ({ component: Link, to: href } as const)
    : ({ component: 'div' } as const)

  return (
    <Box
      sx={{
        position: 'relative',
        '&:hover .sidebar-item-trailing': { opacity: 1 },
      }}
    >
      <ButtonBase
        {...linkProps}
        onClick={onClick}
        disableRipple
        focusRipple={false}
        title={title}
        sx={(t) => ({
          width: '100%',
          justifyContent: 'flex-start',
          gap: 1,
          minHeight: 27,
          py: '2px',
          pr: trailing ? 4 : 1,
          pl: `${8 + depth * 16}px`,
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: 500,
          textAlign: 'left',
          color: palette.textSecondary,
          transition: 'background-color 60ms ease-in',
          ...t.applyStyles('dark', { color: palette.textSecondaryDark }),
          '&:hover': {
            backgroundColor: palette.hover,
            ...t.applyStyles('dark', { backgroundColor: palette.hoverDark }),
          },
          ...(selected && {
            backgroundColor: palette.selected,
            color: palette.text,
            ...t.applyStyles('dark', {
              backgroundColor: palette.selectedDark,
              color: palette.textDark,
            }),
          }),
        })}
      >
        {icon && (
          <Box
            sx={(t) => ({
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: selected ? 'inherit' : palette.icon,
              ...(!selected &&
                t.applyStyles('dark', { color: palette.iconDark })),
              '& svg': { fontSize: 18 },
            })}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            flex: 1,
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </Box>
      </ButtonBase>

      {trailing && (
        <Box
          className="sidebar-item-trailing"
          sx={{
            position: 'absolute',
            right: 4,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            opacity: 0,
            transition: 'opacity 60ms ease-in',
          }}
        >
          {trailing}
        </Box>
      )}
    </Box>
  )
}
