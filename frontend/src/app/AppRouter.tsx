import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'

import { AppLayout } from './layout/AppLayout'
import { LoginPage } from '../pages/auth/LoginPage'
import { RegisterPage } from '../pages/auth/RegisterPage'
import { NotesListPage } from '../pages/notes/NotesListPage'
import { NoteViewPage } from '../pages/notes/NoteViewPage'
import { NoteEditorPage } from '../pages/notes/NoteEditorPage'
import { NotFoundPage } from '../pages/system/NotFoundPage'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/notes" replace />} />
          <Route path="/notes" element={<NotesListPage />} />
          <Route path="/notes/:id" element={<NoteViewPage />} />
          <Route path="/notes/:id/edit" element={<NoteEditorPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
