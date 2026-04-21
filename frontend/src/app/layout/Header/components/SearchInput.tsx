import { InputAdornment, TextField } from '@mui/material'
import { SearchOutlined } from '@mui/icons-material'

export const SearchInput = () => {
  return (
    <TextField
      size="small"
      placeholder="Search notes…"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined
                fontSize="small"
                sx={{ color: 'inherit', opacity: 0.8 }}
              />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        width: 280,
        '& .MuiOutlinedInput-root': {
          color: 'inherit',
          backgroundColor: 'rgba(255,255,255,0.15)',
          borderRadius: 2,
          '& fieldset': { border: 'none' },
          '&:hover': { backgroundColor: 'rgba(255,255,255,0.25)' },
          '&.Mui-focused': { backgroundColor: 'rgba(255,255,255,0.25)' },
        },
        '& input::placeholder': { color: 'inherit', opacity: 0.7 },
      }}
    />
  )
}
