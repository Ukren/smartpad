import * as React from 'react'
import Box from '@mui/material/Box'
import { palette } from '../../../theme/tokens'

interface SidebarSectionLabelProps {
  label: string
  trailing?: React.ReactNode
}

export const SidebarSectionLabel = ({
  label,
  trailing,
}: SidebarSectionLabelProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 26,
        pl: '8px',
        pr: '6px',
        mt: 1,
        '&:hover .sidebar-section-trailing': { opacity: 1 },
      }}
    >
      <Box
        component="span"
        sx={(t) => ({
          fontSize: '12px',
          fontWeight: 600,
          color: palette.textTertiary,
          ...t.applyStyles('dark', { color: palette.textTertiaryDark }),
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        })}
      >
        {label}
      </Box>
      {trailing && (
        <Box
          className="sidebar-section-trailing"
          sx={{
            opacity: 0,
            transition: 'opacity 60ms ease-in',
            display: 'flex',
          }}
        >
          {trailing}
        </Box>
      )}
    </Box>
  )
}
