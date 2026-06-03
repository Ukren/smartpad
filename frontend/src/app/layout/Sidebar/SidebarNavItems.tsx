import { matchPath, useLocation } from 'react-router-dom'
import List from '@mui/material/List'
import ListSubheader from '@mui/material/ListSubheader'
import Divider from '@mui/material/Divider'
import NotesTwoTone from '@mui/icons-material/NotesTwoTone'
import PushPinOutlined from '@mui/icons-material/PushPinOutlined'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import LabelOutlined from '@mui/icons-material/LabelOutlined'
import { MINI_DRAWER_WIDTH } from '../constants'
import DashboardSidebarPageItem from './DashboardSidebarPageItem'

const MOCK_TAGS = ['work', 'personal', 'ideas', 'to-do']

interface SidebarNavItemsProps {
  mini: boolean
}

export const SidebarNavItems = ({ mini }: SidebarNavItemsProps) => {
  const { pathname } = useLocation()

  return (
    <>
      <List
        dense
        sx={{
          padding: mini ? 0 : 0.5,
          mb: 1,
          width: mini ? MINI_DRAWER_WIDTH : 'auto',
        }}
      >
        <DashboardSidebarPageItem
          id="all-notes"
          title="All Notes"
          icon={<NotesTwoTone />}
          href="/notes"
          selected={pathname === '/notes' || pathname === '/'}
        />
        <DashboardSidebarPageItem
          id="pinned-notes"
          title="Pinned Notes"
          icon={<PushPinOutlined />}
          href="/notes/pinned"
          selected={pathname === '/notes/pinned'}
        />
        <DashboardSidebarPageItem
          id="deleted-notes"
          title="Deleted Notes"
          icon={<DeleteOutlined />}
          href="/notes/deleted"
          selected={pathname === '/notes/deleted'}
        />
      </List>

      <Divider />

      {!mini && (
        <List
          dense
          sx={{ padding: 0.5 }}
          subheader={<ListSubheader>Tags</ListSubheader>}
        >
          {MOCK_TAGS.map((tag) => (
            <DashboardSidebarPageItem
              key={tag}
              id={`tag-${tag}`}
              title={tag}
              icon={<LabelOutlined fontSize="small" />}
              href={`/tags/${tag}`}
              selected={!!matchPath(`/tags/${tag}`, pathname)}
            />
          ))}
        </List>
      )}
    </>
  )
}
