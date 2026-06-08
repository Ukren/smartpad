import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export const NotFoundPage = () => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      p: 3,
      textAlign: 'center',
    }}
  >
    <Typography variant="h1" sx={{ fontSize: '3rem' }}>
      404
    </Typography>
    <Typography variant="body1" color="text.secondary">
      We couldn&apos;t find the page you&apos;re looking for.
    </Typography>
    <Button component={Link} to="/notes" variant="contained">
      Back to notes
    </Button>
  </Box>
)
