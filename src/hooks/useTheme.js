import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'

function readInitialTheme() {
  // index.html already set data-theme before first paint; read it back.
  const fromDom = document.documentElement.getAttribute('data-theme')
  if (fromDom === 'light' || fromDom === 'dark') return fromDom
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState(readInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Follow the OS preference live, but only while the visitor has not chosen.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return
      } catch {
        /* storage unavailable */
      }
      setTheme(e.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* storage unavailable — theme still works for this session */
      }
      return next
    })
  }, [])

  return { theme, toggleTheme }
}
