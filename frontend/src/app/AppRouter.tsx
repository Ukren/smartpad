import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

import DashboardLayout from './layout/DashboardLayout'
import { ProtectedRoute } from './ProtectedRoute'

import {
  dataGridCustomizations,
  sidebarCustomizations,
} from '../theme/customizations'

import {
  ChangePasswordPage,
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
  components: {
    ...dataGridCustomizations,
    ...sidebarCustomizations,
  },
})

export const AppRouter = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Navigate to="/notes" replace />} />
              <Route path="/change-password" element={<ChangePasswordPage />} />
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
