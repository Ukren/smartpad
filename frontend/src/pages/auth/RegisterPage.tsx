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

import { registerSchema, type RegisterFormValues } from '../../schemas/auth'

export const RegisterPage = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = (data: RegisterFormValues) => {
    console.log(data)
    navigate('/login')
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
            Create account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Join Smartpad and start taking notes
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              {...register('name')}
              label="Name"
              autoComplete="name"
              autoFocus
              fullWidth
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
            />

            <TextField
              {...register('email')}
              label="Email"
              type="email"
              autoComplete="email"
              fullWidth
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />

            <TextField
              {...register('password')}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
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

            <TextField
              {...register('confirmPassword')}
              label="Confirm password"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              fullWidth
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirm((s) => !s)}
                        edge="end"
                        aria-label="toggle confirm password visibility"
                      >
                        {showConfirm ? (
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
              Create account
            </Button>
          </Box>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Already have an account?{' '}
            <Link component={RouterLink} to="/login">
              Sign in
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
