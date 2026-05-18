import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getNotes,
  getPinnedNotes,
  getDeletedNotes,
  getNote,
  getTags,
  getNotesByTag,
  createNote,
  updateNote,
  deleteNote,
} from '../api/notes'
import type { NoteFormValues } from '../schemas/note'

type NoteUpdateData = Partial<NoteFormValues> & {
  isPinned?: boolean
  isDeleted?: boolean
}

// ── Read hooks ────────────────────────────────────────────────────────────────

export const useNotes = (search?: string) =>
  useQuery({
    queryKey: ['notes', search ?? ''],
    queryFn: () => getNotes(search),
  })

export const usePinnedNotes = () =>
  useQuery({
    queryKey: ['notes', 'pinned'],
    queryFn: getPinnedNotes,
  })

export const useDeletedNotes = () =>
  useQuery({
    queryKey: ['notes', 'deleted'],
    queryFn: getDeletedNotes,
  })

export const useNote = (id: string | undefined) =>
  useQuery({
    queryKey: ['notes', 'detail', id],
    queryFn: () => getNote(id!),
    enabled: Boolean(id),
  })

export const useTags = () =>
  useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
  })

export const useNotesByTag = (tag: string) =>
  useQuery({
    queryKey: ['tags', tag, 'notes'],
    queryFn: () => getNotesByTag(tag),
    enabled: Boolean(tag),
  })

// ── Mutation hooks ────────────────────────────────────────────────────────────

export const useCreateNote = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: NoteFormValues) => createNote(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notes'] })
      qc.invalidateQueries({ queryKey: ['tags'] })
    },
  })
}

export const useUpdateNote = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: NoteUpdateData }) =>
      updateNote(id, data),
    onSuccess: (updatedNote) => {
      qc.invalidateQueries({ queryKey: ['notes'] })
      qc.setQueryData(['notes', 'detail', updatedNote.id], updatedNote)
    },
  })
}

export const useDeleteNote = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notes'] })
    },
  })
}

export const useTogglePin = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, isPinned }: { id: string; isPinned: boolean }) =>
      updateNote(id, { isPinned }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notes'] })
    },
  })
}

export const useSoftDeleteNote = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => updateNote(id, { isDeleted: true }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notes'] })
    },
  })
}

export const useRestoreNote = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => updateNote(id, { isDeleted: false }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notes'] })
    },
  })
}
