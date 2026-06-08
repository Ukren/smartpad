import * as React from 'react'
import { matchPath, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useColorScheme } from '@mui/material/styles'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined'
import ImportExportIcon from '@mui/icons-material/ImportExport'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import { useDashboardLayout } from '../context/DashboardLayoutContext'
import { SidebarItem } from './SidebarItem'
import { SidebarSectionLabel } from './SidebarSectionLabel'

const MOCK_TAGS = ['work', 'personal', 'ideas', 'to-do']

export const SidebarTbdSection = () => {
  const { pathname } = useLocation()
  const { isMobile, setSidebarOpen } = useDashboardLayout()
  const { mode, setMode } = useColorScheme()
  const [importExportAnchor, setImportExportAnchor] =
    React.useState<null | HTMLElement>(null)

  const closeOnMobile = () => {
    if (isMobile) setSidebarOpen(false)
  }

  const isDark = mode === 'dark'

  return (
    <Box>
      <SidebarSectionLabel label="TBD" />

      <SidebarItem
        href="/notes/pinned"
        onClick={closeOnMobile}
        icon={<PushPinOutlinedIcon />}
        label="Pinned Notes"
        selected={pathname === '/notes/pinned'}
      />

      {MOCK_TAGS.map((tag) => (
        <SidebarItem
          key={tag}
          href={`/tags/${tag}`}
          onClick={closeOnMobile}
          icon={<LabelOutlinedIcon />}
          label={tag}
          depth={1}
          selected={Boolean(matchPath(`/tags/${tag}`, pathname))}
        />
      ))}

      <SidebarItem
        icon={<ImportExportIcon />}
        label="Import / Export"
        onClick={(e) => setImportExportAnchor(e.currentTarget)}
      />
      <Menu
        anchorEl={importExportAnchor}
        open={Boolean(importExportAnchor)}
        onClose={() => setImportExportAnchor(null)}
        anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
        transformOrigin={{ vertical: 'center', horizontal: 'left' }}
      >
        <MenuItem onClick={() => setImportExportAnchor(null)}>
          <ListItemIcon>
            <FileUploadOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Import notes</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setImportExportAnchor(null)}>
          <ListItemIcon>
            <FileDownloadOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Export notes</ListItemText>
        </MenuItem>
      </Menu>

      <SidebarItem
        icon={isDark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
        label={isDark ? 'Light mode' : 'Dark mode'}
        onClick={() => setMode(isDark ? 'light' : 'dark')}
      />
    </Box>
  )
}
