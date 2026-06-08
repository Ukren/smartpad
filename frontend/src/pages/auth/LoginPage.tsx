import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  TextField,
} from '@mui/material'
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'

import { loginSchema, type LoginFormValues } from '../../schemas/auth'
import { useLogin } from '../../hooks/useAuth'
import { AuthShell } from './AuthShell'

const DEMO_EMAIL = 'demo@example.com'
const DEMO_PASSWORD = 'password123'

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const login = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormValues) => {
    login.mutate(data)
  }

  const loginAsDemo = () => {
    login.mutate({ email: DEMO_EMAIL, password: DEMO_PASSWORD })
  }

  return (
    <AuthShell
      title="Sign in"
      subtitle="Welcome back to SmartPad"
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link component={RouterLink} to="/register">
            Register
          </Link>
        </>
      }
    >
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

        {login.isError && (
          <Alert severity="error" sx={{ mt: 1 }}>
            Invalid email or password
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={login.isPending}
          sx={{ mt: 1 }}
        >
          {login.isPending ? 'Signing in…' : 'Sign in'}
        </Button>
      </Box>

      <Divider sx={{ my: 2 }}>or</Divider>

      <Button
        variant="outlined"
        fullWidth
        onClick={loginAsDemo}
        disabled={login.isPending}
      >
        Try Demo
      </Button>
    </AuthShell>
  )
}
