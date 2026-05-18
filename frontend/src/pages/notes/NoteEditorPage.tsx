import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import {
  ArrowBack,
  EditOutlined,
  VisibilityOutlined,
} from '@mui/icons-material'

import { z } from 'zod'
import { noteSchema } from '../../schemas/note'
import {
  useNote,
  useCreateNote,
  useUpdateNote,
  useTags,
} from '../../hooks/useNotes'
import { EmptyState, Loader, MarkdownPreview } from '../../components'

export const NoteEditorPage = () => {
  const { id } = useParams<{ id?: string }>()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const { data: note, isLoading: noteLoading } = useNote(id)
  const { data: tagsData = [] } = useTags()
  const tagOptions = tagsData.map((t) => t.name)

  const createNote = useCreateNote()
  const updateNote = useUpdateNote()

  const [preview, setPreview] = useState(false)
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.input<typeof noteSchema>, unknown, z.output<typeof noteSchema>>(
    {
      resolver: zodResolver(noteSchema),
      defaultValues: {
        title: '',
        content: '',
        tags: [],
      },
    }
  )
  useEffect(() => {
    if (note) {
      reset({
        title: note.title,
        content: note.content,
        tags: note.tags.map((t) => t.name),
      })
    }
  }, [note, reset])

  const watchedContent = useWatch({ control, name: 'content' })

  if (isEdit && noteLoading) return <Loader />
  if (isEdit && !note) return <EmptyState message="Note not found" />

  const onSubmit = async (data: z.output<typeof noteSchema>) => {
    if (isEdit && id) {
      await updateNote.mutateAsync({ id, data })
    } else {
      await createNote.mutateAsync(data)
    }
    navigate('/notes')
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* ── Toolbar ────────────────────────────────────────── */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Button
          startIcon={<ArrowBack />}
          size="small"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        <ToggleButtonGroup
          size="small"
          exclusive
          value={preview ? 'preview' : 'edit'}
          onChange={(_, val) => val !== null && setPreview(val === 'preview')}
        >
          <ToggleButton value="edit">
            <EditOutlined fontSize="small" sx={{ mr: 0.5 }} />
            Edit
          </ToggleButton>
          <ToggleButton value="preview">
            <VisibilityOutlined fontSize="small" sx={{ mr: 0.5 }} />
            Preview
          </ToggleButton>
        </ToggleButtonGroup>

        <Button
          type="submit"
          variant="contained"
          disabled={
            isSubmitting || createNote.isPending || updateNote.isPending
          }
        >
          {isEdit ? 'Update' : 'Save'}
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <TextField
        {...register('title')}
        label="Title"
        fullWidth
        autoFocus
        error={Boolean(errors.title)}
        helperText={errors.title?.message}
        sx={{ mb: 2 }}
      />

      <Controller
        name="tags"
        control={control}
        render={({ field }) => (
          <Autocomplete
            multiple
            freeSolo
            options={tagOptions}
            value={field.value ?? []}
            onChange={(_, newValue) => field.onChange(newValue as string[])}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                placeholder="Add tag…"
                error={Boolean(errors.tags)}
                helperText={
                  errors.tags?.message ?? 'Press Enter to add a custom tag'
                }
              />
            )}
            sx={{ mb: 3 }}
          />
        )}
      />

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mb: 1, display: 'block' }}
      >
        Content (Markdown supported)
      </Typography>

      {preview ? (
        <Box
          sx={{
            minHeight: 240,
            p: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
          }}
        >
          {watchedContent ? (
            <MarkdownPreview content={watchedContent} />
          ) : (
            <Typography color="text.disabled" variant="body2">
              Nothing to preview yet.
            </Typography>
          )}
        </Box>
      ) : (
        <TextField
          {...register('content')}
          multiline
          minRows={10}
          fullWidth
          placeholder="Write in Markdown…"
          error={Boolean(errors.content)}
          helperText={errors.content?.message}
        />
      )}
    </Box>
  )
}
