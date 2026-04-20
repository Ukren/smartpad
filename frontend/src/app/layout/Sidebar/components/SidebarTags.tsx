import { useNavigate } from 'react-router-dom'
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material'

import { LabelOutlined } from '@mui/icons-material'

const MOCK_TAGS = ['work', 'personal', 'ideas', 'to-do']

export const SidebarTags = () => {
  const navigate = useNavigate()

  return (
    <List subheader={<ListSubheader>Tags</ListSubheader>}>
      {MOCK_TAGS.map((tag) => (
        <ListItemButton key={tag} onClick={() => navigate(`/tags/${tag}`)}>
          <ListItemIcon>
            <LabelOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={tag} />
        </ListItemButton>
      ))}
    </List>
  )
}
