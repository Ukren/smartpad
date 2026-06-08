import * as React from 'react'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'
import { useDashboardLayout } from '../app/layout/context/DashboardLayoutContext'
import { palette } from '../theme/tokens'

export interface Breadcrumb {
  title: string
  path?: string
}

export interface PageContainerProps {
  children?: React.ReactNode
  breadcrumbs?: Breadcrumb[]
  actions?: React.ReactNode
  maxWidth?: number
  disableGutters?: boolean
}

export const PageContainer = (props: PageContainerProps) => {
  const {
    children,
    breadcrumbs = [],
    actions = null,
    maxWidth = 900,
    disableGutters = false,
  } = props

  const { sidebarOpen, setSidebarOpen, isMobile } = useDashboardLayout()
  const showMenuButton = isMobile || !sidebarOpen

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}
    >
      <Box
        sx={(t) => ({
          position: 'sticky',
          top: 0,
          zIndex: 5,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          height: 45,
          px: 1.5,
          backgroundColor: palette.appBg,
          ...t.applyStyles('dark', { backgroundColor: palette.appBgDark }),
        })}
      >
        {showMenuButton && (
          <Tooltip title="Open sidebar">
            <IconButton size="small" onClick={() => setSidebarOpen(true)}>
              <MenuIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
        )}

        <Breadcrumbs
          aria-label="breadcrumb"
          separator={
            <Box
              component="span"
              sx={(t) => ({
                color: palette.textTertiary,
                ...t.applyStyles('dark', { color: palette.textTertiaryDark }),
              })}
            >
              /
            </Box>
          }
          sx={{
            fontSize: '14px',
            '& .MuiBreadcrumbs-ol': { flexWrap: 'nowrap' },
            '& .MuiBreadcrumbs-li': { minWidth: 0 },
          }}
        >
          {breadcrumbs.map((breadcrumb, index) => {
            const isLast = index === breadcrumbs.length - 1
            const sharedSx = {
              fontSize: '14px',
              fontWeight: 500,
              maxWidth: 320,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              borderRadius: '4px',
              px: 0.5,
              display: 'block',
            } as const

            return breadcrumb.path && !isLast ? (
              <Box
                key={index}
                component={Link}
                to={breadcrumb.path}
                sx={(t) => ({
                  ...sharedSx,
                  textDecoration: 'none',
                  color: palette.textSecondary,
                  ...t.applyStyles('dark', {
                    color: palette.textSecondaryDark,
                  }),
                  '&:hover': {
                    backgroundColor: palette.hover,
                    ...t.applyStyles('dark', {
                      backgroundColor: palette.hoverDark,
                    }),
                  },
                })}
              >
                {breadcrumb.title}
              </Box>
            ) : (
              <Typography
                key={index}
                sx={(t) => ({
                  ...sharedSx,
                  color: palette.text,
                  ...t.applyStyles('dark', { color: palette.textDark }),
                })}
              >
                {breadcrumb.title}
              </Typography>
            )
          })}
        </Breadcrumbs>

        {actions && (
          <Box
            sx={{
              ml: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            {actions}
          </Box>
        )}
      </Box>
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Box
          sx={{
            maxWidth: disableGutters ? '100%' : maxWidth,
            mx: 'auto',
            px: disableGutters ? 0 : { xs: 3, sm: 5, md: 12 },
            pt: 2,
            pb: 10,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
