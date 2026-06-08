import { createTheme } from '@mui/material/styles'
import { palette, overlayShadow } from './tokens'

const SYSTEM_FONT_STACK = [
  'ui-sans-serif',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Helvetica',
  '"Apple Color Emoji"',
  'Arial',
  'sans-serif',
].join(', ')

export const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'class' },
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        primary: { main: palette.blue },
        background: { default: palette.appBg, paper: palette.appBg },
        text: { primary: palette.text, secondary: palette.textSecondary },
        divider: palette.border,
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        primary: { main: palette.blue },
        background: { default: palette.appBgDark, paper: palette.appBgDark },
        text: {
          primary: palette.textDark,
          secondary: palette.textSecondaryDark,
        },
        divider: palette.borderDark,
      },
    },
  },
  shape: { borderRadius: 4 },
  typography: {
    fontFamily: SYSTEM_FONT_STACK,
    h1: { fontWeight: 700, fontSize: '2.5rem', letterSpacing: '-0.01em' },
    h2: { fontWeight: 700, fontSize: '1.875rem', letterSpacing: '-0.01em' },
    h3: { fontWeight: 600, fontSize: '1.5rem' },
    h4: { fontWeight: 600, fontSize: '1.25rem' },
    h5: { fontWeight: 600, fontSize: '1.125rem' },
    h6: { fontWeight: 600, fontSize: '1rem' },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*::-webkit-scrollbar': { width: 10, height: 10 },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(55, 53, 47, 0.2)',
          borderRadius: 8,
          border: '2px solid transparent',
          backgroundClip: 'content-box',
        },
        '*::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'rgba(55, 53, 47, 0.35)',
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 4, boxShadow: 'none' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 10,
          border: `1px solid ${palette.border}`,
          boxShadow: '0 1px 3px rgba(15, 15, 15, 0.05)',
          ...theme.applyStyles('dark', {
            border: `1px solid ${palette.borderDark}`,
            boxShadow: 'none',
          }),
        }),
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
          boxShadow: overlayShadow,
          marginTop: 4,
        },
        list: { padding: 4 },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontSize: '0.875rem',
          minHeight: 32,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(15, 15, 15, 0.9)',
          fontSize: '0.75rem',
          borderRadius: 4,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 4, fontWeight: 500 },
        sizeSmall: { height: 20, fontSize: '0.75rem' },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 4 },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: palette.border },
      },
    },
  },
})
