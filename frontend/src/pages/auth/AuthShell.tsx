import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { palette } from '../../theme/tokens'

interface AuthShellProps {
  title: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
}

export const AuthShell = ({
  title,
  subtitle,
  children,
  footer,
}: AuthShellProps) => (
  <Box
    sx={(t) => ({
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      px: 2,
      backgroundColor: palette.appBg,
      ...t.applyStyles('dark', { backgroundColor: palette.appBgDark }),
    })}
  >
    <Box sx={{ width: '100%', maxWidth: 340 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: '6px',
            backgroundColor: palette.blue,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          S
        </Box>
        <Typography sx={{ fontSize: 18, fontWeight: 600 }}>SmartPad</Typography>
      </Box>

      <Typography sx={{ fontSize: '1.75rem', fontWeight: 700, mb: 0.5 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {subtitle}
        </Typography>
      )}

      {children}

      {footer && (
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          sx={{ mt: 3 }}
        >
          {footer}
        </Typography>
      )}
    </Box>
  </Box>
)
