import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material'
import {
  DeleteOutlined,
  FileDownloadOutlined,
  FileUploadOutlined,
  ImportExportOutlined,
  SettingsOutlined,
} from '@mui/icons-material'

export const SidebarFooter = () => {
  const navigate = useNavigate()
  const [importExportAnchor, setImportExportAnchor] =
    useState<null | HTMLElement>(null)

  return (
    <Box sx={{ mt: 'auto' }}>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          px: 1,
          py: 0.5,
        }}
      >
        <Tooltip title="Deleted notes">
          <IconButton size="small" onClick={() => navigate('/notes/deleted')}>
            <DeleteOutlined fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Import / Export">
          <IconButton
            size="small"
            onClick={(e) => setImportExportAnchor(e.currentTarget)}
          >
            <ImportExportOutlined fontSize="small" />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={importExportAnchor}
          open={Boolean(importExportAnchor)}
          onClose={() => setImportExportAnchor(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <MenuItem onClick={() => setImportExportAnchor(null)}>
            <ListItemIcon>
              <FileUploadOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText>Import notes</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => setImportExportAnchor(null)}>
            <ListItemIcon>
              <FileDownloadOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText>Export notes</ListItemText>
          </MenuItem>
        </Menu>

        <Tooltip title="Settings">
          <IconButton size="small">
            <SettingsOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}
