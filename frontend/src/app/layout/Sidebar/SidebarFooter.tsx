import { useState } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import ImportExportOutlined from '@mui/icons-material/ImportExportOutlined'
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined'
import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined'
import SettingsOutlined from '@mui/icons-material/SettingsOutlined'

interface SidebarFooterProps {
  mini: boolean
}

export const SidebarFooter = ({ mini }: SidebarFooterProps) => {
  const [importExportAnchor, setImportExportAnchor] =
    useState<null | HTMLElement>(null)

  return (
    <Box>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: mini ? 'center' : 'space-around',
          px: 1,
          py: 0.5,
        }}
      >
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

        {!mini && (
          <Tooltip title="Settings">
            <IconButton size="small">
              <SettingsOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  )
}
