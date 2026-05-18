import apiClient from './apiClient'
import type { Note } from '../types/note'
import type { NoteFormValues } from '../schemas/note'

type NoteUpdateData = Partial<NoteFormValues> & {
  isPinned?: boolean
  isDeleted?: boolean
}

export const getNotes = (search?: string): Promise<Note[]> =>
  apiClient
    .get('/notes', { params: search ? { search } : {} })
    .then((r) => r.data)

export const getPinnedNotes = (): Promise<Note[]> =>
  apiClient.get('/notes/pinned').then((r) => r.data)

export const getDeletedNotes = (): Promise<Note[]> =>
  apiClient.get('/notes/deleted').then((r) => r.data)

export const getNote = (id: string): Promise<Note> =>
  apiClient.get(`/notes/${id}`).then((r) => r.data)

export const createNote = (data: NoteFormValues): Promise<Note> =>
  apiClient.post('/notes', data).then((r) => r.data)

export const updateNote = (id: string, data: NoteUpdateData): Promise<Note> =>
  apiClient.patch(`/notes/${id}`, data).then((r) => r.data)

export const deleteNote = (id: string): Promise<void> =>
  apiClient.delete(`/notes/${id}`).then(() => undefined)

export const getTags = (): Promise<{ id: string; name: string }[]> =>
  apiClient.get('/tags').then((r) => r.data)

export const getNotesByTag = (tag: string): Promise<Note[]> =>
  apiClient.get(`/tags/${encodeURIComponent(tag)}/notes`).then((r) => r.data)
