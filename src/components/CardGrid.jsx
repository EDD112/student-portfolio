import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import ProjectCard, { MS } from './ProjectCard'

// The grid of expandable cards, used by the Projects section.
// It owns which cards are open, and keeps open cards in the same row at equal height.
export default function CardGrid({ items }) {
  const [open, setOpen] = useState({})
  const openRef = useRef({})

  // Animations are only switched on right after a click, so resizing the window never animates
  const [animate, setAnimate] = useState(false)
  const timer = useRef(null)

  // Each card reports how tall it would be fully open (index -> px)
  const [naturals, setNaturals] = useState({})
  const handleMeasure = useCallback((i, n) => {
    setNaturals((prev) => (Math.abs((prev[i] || 0) - n) < 0.25 ? prev : { ...prev, [i]: n }))
  }, [])

  // How many cards sit in one row (changes with screen width)
  const gridRef = useRef(null)
  const [cols, setCols] = useState(1)
  useLayoutEffect(() => {
    const el = gridRef.current
    if (!el) return
    const update = () => {
      const n = getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length
      setCols(Math.max(1, n))
    }
    update()
    if (!('ResizeObserver' in window)) return
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const toggle = useCallback((i) => {
    const next = !openRef.current[i]
    openRef.current = { ...openRef.current, [i]: next }
    setAnimate(true)
    setOpen(openRef.current)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setAnimate(false), MS + 120)
  }, [])
  useEffect(() => () => clearTimeout(timer.current), [])

  // Equal heights: inside each row, every open card is padded up to the tallest open card.
  // Worked out here (not with CSS stretch) so the extra space can animate instead of snapping.
  // A closed card keeps its last value so it collapses cleanly.
  const frozen = useRef({})
  const extras = {}
  for (let start = 0; start < items.length; start += cols) {
    const row = []
    for (let i = start; i < Math.min(start + cols, items.length); i++) if (open[i]) row.push(i)
    const tallest = Math.max(0, ...row.map((i) => naturals[i] || 0))
    row.forEach((i) => {
      frozen.current[i] = naturals[i] ? Math.max(0, tallest - naturals[i]) : 0
    })
  }
  items.forEach((_, i) => {
    extras[i] = frozen.current[i] || 0
  })

  return (
    <ul className="projects__grid" ref={gridRef}>
      {items.map((item, i) => (
        <Reveal as="li" key={`${item.title}-${i}`} delay={(i % 3) * 90}>
          <ProjectCard
            project={item}
            index={i}
            expanded={!!open[i]}
            extra={extras[i]}
            animate={animate}
            onToggle={toggle}
            onMeasure={handleMeasure}
          />
        </Reveal>
      ))}
    </ul>
  )
}
