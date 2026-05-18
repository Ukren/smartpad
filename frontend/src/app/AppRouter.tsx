import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { AppLayout } from './layout/AppLayout'
import { ProtectedRoute } from './ProtectedRoute'
import { CssBaseline } from '@mui/material'

import {
  DeletedNotesPage,
  LoginPage,
  NoteEditorPage,
  NotesListPage,
  NoteViewPage,
  NotFoundPage,
  PinnedNotesPage,
  RegisterPage,
  TaggedNotesPage,
} from '../pages'

const theme = createTheme({
  colorSchemes: { light: true, dark: true },
})

export const AppRouter = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Navigate to="/notes" replace />} />
              <Route path="/notes" element={<NotesListPage />} />
              <Route path="/notes/pinned" element={<PinnedNotesPage />} />
              <Route path="/notes/deleted" element={<DeletedNotesPage />} />
              <Route path="/notes/new" element={<NoteEditorPage />} />
              <Route path="/notes/:id" element={<NoteViewPage />} />
              <Route path="/notes/:id/edit" element={<NoteEditorPage />} />
              <Route path="/tags/:tag" element={<TaggedNotesPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
