import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'

import { changePasswordSchema } from '../../schemas/auth'
import { useChangePassword } from '../../hooks/useAuth'
import type { z } from 'zod'

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>

export const ChangePasswordPage = () => {
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const changePassword = useChangePassword()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  })

  const onSubmit = (data: ChangePasswordFormValues) => {
    changePassword.mutate(
      { currentPassword: data.currentPassword, newPassword: data.newPassword },
      { onSuccess: () => reset() }
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        p: 4,
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 440 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
            Change password
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Enter your current password and choose a new one
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              {...register('currentPassword')}
              label="Current password"
              type={showCurrent ? 'text' : 'password'}
              autoComplete="current-password"
              fullWidth
              error={Boolean(errors.currentPassword)}
              helperText={errors.currentPassword?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowCurrent((s) => !s)}
                        edge="end"
                        aria-label="toggle current password visibility"
                      >
                        {showCurrent ? (
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
              {...register('newPassword')}
              label="New password"
              type={showNew ? 'text' : 'password'}
              autoComplete="new-password"
              fullWidth
              error={Boolean(errors.newPassword)}
              helperText={errors.newPassword?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowNew((s) => !s)}
                        edge="end"
                        aria-label="toggle new password visibility"
                      >
                        {showNew ? (
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
              label="Confirm new password"
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

            {changePassword.isError && (
              <Alert severity="error">Current password is incorrect</Alert>
            )}

            {changePassword.isSuccess && (
              <Alert severity="success">Password changed successfully</Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={changePassword.isPending}
              sx={{ mt: 1 }}
            >
              {changePassword.isPending ? 'Saving…' : 'Change password'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
