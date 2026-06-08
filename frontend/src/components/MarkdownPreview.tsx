import { Box } from '@mui/material'
import ReactMarkdown from 'react-markdown'

type MarkdownPreviewProps = {
  content: string
}

export const MarkdownPreview = ({
  content,
}: MarkdownPreviewProps): React.ReactNode => {
  return (
    <Box
      sx={{
        color: 'text.primary',
        fontSize: '1rem',
        lineHeight: 1.7,
        '& h1': { fontSize: '1.875rem', fontWeight: 700, mt: 3, mb: 1 },
        '& h2': { fontSize: '1.5rem', fontWeight: 600, mt: 3, mb: 1 },
        '& h3': { fontSize: '1.25rem', fontWeight: 600, mt: 2, mb: 0.5 },
        '& p': { mb: 1.5 },
        '& ul, & ol': { pl: 3, mb: 1.5 },
        '& li': { mb: 0.5 },
        '& a': { color: 'primary.main', textDecoration: 'underline' },
        '& blockquote': {
          borderLeft: '3px solid',
          borderColor: 'divider',
          pl: 2,
          ml: 0,
          color: 'text.secondary',
        },
        '& code': {
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
          fontSize: '0.85em',
          backgroundColor: 'action.hover',
          px: 0.5,
          py: '1px',
          borderRadius: 1,
        },
        '& pre': {
          backgroundColor: 'action.hover',
          p: 2,
          borderRadius: 1,
          overflow: 'auto',
          '& code': { backgroundColor: 'transparent', p: 0 },
        },
        '& img': { maxWidth: '100%', borderRadius: 1 },
        '& hr': {
          border: 0,
          borderTop: '1px solid',
          borderColor: 'divider',
          my: 3,
        },
      }}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </Box>
  )
}
