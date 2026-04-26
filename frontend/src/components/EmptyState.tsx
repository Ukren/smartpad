import { Box, Typography } from '@mui/material'

type EmptyStateProps = {
  message: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export const EmptyState = ({
  message,
  icon,
  action,
}: EmptyStateProps): React.ReactNode => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        py: 8,
      }}
    >
      {icon && (
        <Box sx={{ fontSize: 64, color: 'text.disabled', display: 'flex' }}>
          {icon}
        </Box>
      )}
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
      {action}
    </Box>
  )
}
