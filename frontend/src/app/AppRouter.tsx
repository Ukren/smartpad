import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'

import { AppLayout } from './layout/AppLayout'
import {
  LoginPage,
  NoteEditorPage,
  NotesListPage,
  NoteViewPage,
  NotFoundPage,
  PinnedNotesPage,
  RegisterPage,
} from '../pages'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/notes" replace />} />
          <Route path="/notes" element={<NotesListPage />} />
          <Route path="/notes/pinned" element={<PinnedNotesPage />} />
          <Route path="/notes/:id" element={<NoteViewPage />} />
          <Route path="/notes/:id/edit" element={<NoteEditorPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
