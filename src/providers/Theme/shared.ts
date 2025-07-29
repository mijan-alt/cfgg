
import type { Theme } from './types'

export const themeLocalStorageKey = 'theme'

// ✅ Change this to 'light' to default to white theme
export const defaultTheme: Theme = 'light' // Changed from 'dark' to 'light'

export const getImplicitPreference = (): Theme | null => {
  // ✅ Force light theme instead of checking system preference
  // Comment out or modify this function to always return 'light'
  
  // Old version that checks system preference:
  // if (typeof window !== 'undefined' && window.matchMedia) {
  //   const mq = window.matchMedia('(prefers-color-scheme: dark)')
  //   if (mq.matches) {
  //     return 'dark'
  //   }
  // }
  // return 'light'
  
  // New version that forces light theme:
  return 'light'
}