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
        '& h1': { typography: 'h4', mb: 1 },
        '& h2': { typography: 'h5', mb: 1 },
        '& h3': { typography: 'h6', mb: 1 },
        '& p': { typography: 'body1', mb: 1 },
        '& ul, & ol': { pl: 3 },
        '& code': {
          fontFamily: 'monospace',
          backgroundColor: 'action.hover',
          px: 0.5,
          borderRadius: 1,
        },
      }}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </Box>
  )
}
