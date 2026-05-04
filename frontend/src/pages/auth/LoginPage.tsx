import { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'

import { loginSchema, type LoginFormValues } from '../../schemas/auth'

export const LoginPage = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormValues) => {
    console.log(data)
    navigate('/notes')
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 400 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
            Sign in
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Welcome back to Smartpad
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              {...register('email')}
              label="Email"
              type="email"
              autoComplete="email"
              autoFocus
              fullWidth
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />

            <TextField
              {...register('password')}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              fullWidth
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((s) => !s)}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? (
                          <VisibilityOffOutlined />
                        ) : (
                          <VisibilityOutlined />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
              sx={{ mt: 1 }}
            >
              Sign in
            </Button>
          </Box>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Don&apos;t have an account?{' '}
            <Link component={RouterLink} to="/register">
              Register
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
