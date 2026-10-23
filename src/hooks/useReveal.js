import { useEffect, useRef, useState } from 'react'

// Adds a one-time "is visible" flag when the element scrolls into view.
// Content is visible by default if IntersectionObserver is unavailable.
export function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(() => typeof window === 'undefined' || !('IntersectionObserver' in window))

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [visible])

  return [ref, visible]
}
