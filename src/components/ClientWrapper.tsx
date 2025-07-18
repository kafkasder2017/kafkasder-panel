'use client'

import { ReactNode } from 'react'

interface ClientWrapperProps {
  children: ReactNode
}

// Context7: Client wrapper to handle event handlers
export default function ClientWrapper({ children }: ClientWrapperProps) {
  return <>{children}</>
} 