import { createContext, useContext } from 'react'

export interface DashboardLayoutContextValue {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  isMobile: boolean
}

export const DashboardLayoutContext =
  createContext<DashboardLayoutContextValue | null>(null)

export const useDashboardLayout = (): DashboardLayoutContextValue => {
  const ctx = useContext(DashboardLayoutContext)
  if (!ctx) {
    throw new Error(
      'useDashboardLayout must be used within a DashboardLayout provider'
    )
  }
  return ctx
}
