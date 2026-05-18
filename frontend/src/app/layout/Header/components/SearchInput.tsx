import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { InputAdornment, TextField } from '@mui/material'
import { SearchOutlined } from '@mui/icons-material'
import { useDebounce } from '../../../../hooks/useDebounce'

export const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [value, setValue] = useState(searchParams.get('search') ?? '')
  const debounced = useDebounce(value, 400)

  useEffect(() => {
    setSearchParams(debounced ? { search: debounced } : {}, { replace: true })
  }, [debounced, setSearchParams])

  return (
    <TextField
      size="small"
      placeholder="Search notes…"
      value={value}
      onChange={(e) => setValue(e.target.value)}
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
