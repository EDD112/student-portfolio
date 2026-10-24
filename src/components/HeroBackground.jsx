import { useEffect, useRef } from 'react'

// A calm, editor-style backdrop: a faint dot matrix, one soft glow, and a few lines of
// syntax-highlighted code that scroll very slowly behind the photo side of the hero.
// Colors come from your theme's accent, so it follows light/dark mode automatically.
// It pauses when off-screen or when the tab is hidden, and stays still for people
// who have "reduce motion" turned on.

const SNIPPET = [
  'const developer = {',
  '  name: "Edwin L. Argallon Jr.",',
  '  role: "IT Student",',
  '  stack: ["Python", "Django", "Flutter"],',
  '  focus: "software development",',
  '};',
  '',
  '// turn a problem into a working system',
  'async function buildSolution(problem) {',
  '  const plan = analyze(problem);',
  '  const app = implement(plan);',
  '  await test(app);',
  '  return deploy(app);',
  '}',
  '',
  'buildSolution("real-world problem");',
  '',
]

const FONT = "ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace"
const SIZE = 15
const LINE_H = 27
const TOKEN_RE = /(\/\/.*|"[^"]*"|\b(?:const|function|async|await|return|class|new)\b|[A-Za-z_]\w*(?=\()|[{}()[\];,.:=<>]+|\s+|\w+)/g

const KEYWORDS = new Set(['const', 'function', 'async', 'await', 'return', 'class', 'new'])

function tokenize(line) {
  return (line.match(TOKEN_RE) || []).map((text) => {
    let type = 'plain'
    if (text.startsWith('//')) type = 'comment'
    else if (text.startsWith('"')) type = 'string'
    else if (KEYWORDS.has(text)) type = 'keyword'
    else if (/^[{}()[\];,.:=<>]+$/.test(text)) type = 'punct'
    else if (/^[A-Za-z_]\w*$/.test(text) && line.includes(text + '(')) type = 'fn'
    return { text, type }
  })
}

function hexToRgb(hex) {
  const h = hex.replace('#', '').trim()
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  return Number.isNaN(n) ? [155, 130, 255] : [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export default function HeroBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lines = SNIPPET.map(tokenize)
    const blockH = lines.length * LINE_H

    // two cached layers: the still backdrop, and the code (re-drawn while scrolling)
    const base = document.createElement('canvas')
    const code = document.createElement('canvas')
    const bctx = base.getContext('2d')
    const cctx = code.getContext('2d')

    let w = 0
    let h = 0
    let dpr = 1
    let raf = 0
    let onScreen = true
    let offset = 0
    let accent = [155, 130, 255]
    let dark = true

    const readTheme = () => {
      const root = document.documentElement
      accent = hexToRgb(getComputedStyle(root).getPropertyValue('--accent'))
      dark = root.getAttribute('data-theme') === 'dark'
    }

    // dot matrix + one soft glow, faded toward the edges
    const paintBase = () => {
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      bctx.clearRect(0, 0, w, h)
      const a = accent.join(',')
      const k = dark ? 1 : 0.6

      const glow = bctx.createRadialGradient(w * 0.78, h * 0.3, 0, w * 0.78, h * 0.3, Math.max(w, h) * 0.55)
      glow.addColorStop(0, `rgba(${a},${0.17 * k})`)
      glow.addColorStop(1, `rgba(${a},0)`)
      bctx.fillStyle = glow
      bctx.fillRect(0, 0, w, h)

      const gap = 30
      const cx = w / 2
      const cy = h * 0.45
      for (let x = gap / 2; x < w; x += gap) {
        for (let y = gap / 2; y < h; y += gap) {
          const dx = (x - cx) / (w * 0.62)
          const dy = (y - cy) / (h * 0.62)
          const fall = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy))
          if (fall <= 0) continue
          bctx.fillStyle = `rgba(${a},${0.22 * fall * k})`
          bctx.beginPath()
          bctx.arc(x, y, 1.1, 0, Math.PI * 2)
          bctx.fill()
        }
      }
    }

    const colors = () => {
      const a = accent.join(',')
      return dark
        ? { keyword: `rgb(${a})`, fn: '#7dd3fc', string: '#86d6a8', comment: '#7c8399', punct: '#9aa1b5', plain: '#cfd3e1', num: '#9aa1b5' }
        : { keyword: `rgb(${a})`, fn: '#0b6a9a', string: '#1f7a4a', comment: '#7b8194', punct: '#5d6275', plain: '#2a2d3a', num: '#5d6275' }
    }

    function paintCode() {
      cctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cctx.globalCompositeOperation = 'source-over'
      cctx.clearRect(0, 0, w, h)

      const narrow = w < 760
      const x0 = narrow ? 18 : w * 0.53
      const gutter = 34
      const c = colors()
      cctx.font = `${SIZE}px ${FONT}`
      cctx.textBaseline = 'middle'
      cctx.textAlign = 'left'

      const repeats = Math.ceil(h / blockH) + 2
      for (let r = 0; r < repeats; r++) {
        for (let i = 0; i < lines.length; i++) {
          const y = r * blockH + i * LINE_H - (offset % blockH) + LINE_H / 2
          if (y < -LINE_H || y > h + LINE_H) continue
          cctx.fillStyle = c.comment
          cctx.fillText(String((r * lines.length + i) % 99 + 1).padStart(2, ' '), x0, y)
          let x = x0 + gutter
          for (const t of lines[i]) {
            cctx.fillStyle = c[t.type] || c.plain
            cctx.fillText(t.text, x, y)
            x += cctx.measureText(t.text).width
          }
        }
      }

      // fade the code: in from the left, out at top and bottom
      cctx.globalCompositeOperation = 'destination-in'
      const hg = cctx.createLinearGradient(0, 0, w, 0)
      if (narrow) {
        hg.addColorStop(0, 'rgba(0,0,0,0.3)')
        hg.addColorStop(1, 'rgba(0,0,0,0.3)')
      } else {
        hg.addColorStop(0, 'rgba(0,0,0,0)')
        hg.addColorStop(0.53, 'rgba(0,0,0,0)')
        hg.addColorStop(0.7, 'rgba(0,0,0,1)')
        hg.addColorStop(1, 'rgba(0,0,0,1)')
      }
      cctx.fillStyle = hg
      cctx.fillRect(0, 0, w, h)

      const vg = cctx.createLinearGradient(0, 0, 0, h)
      vg.addColorStop(0, 'rgba(0,0,0,0)')
      vg.addColorStop(0.18, 'rgba(0,0,0,1)')
      vg.addColorStop(0.82, 'rgba(0,0,0,1)')
      vg.addColorStop(1, 'rgba(0,0,0,0)')
      cctx.fillStyle = vg
      cctx.fillRect(0, 0, w, h)
      cctx.globalCompositeOperation = 'source-over'
    }

    function draw(move) {
      if (move) offset += 0.22
      paintCode()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(base, 0, 0)
      ctx.globalAlpha = dark ? 0.2 : 0.16
      ctx.drawImage(code, 0, 0)
      ctx.globalAlpha = 1
    }

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      for (const c of [canvas, base, code]) {
        c.width = Math.round(w * dpr)
        c.height = Math.round(h * dpr)
      }
      paintBase()
      draw(false)
    }

    const loop = () => {
      draw(true)
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (!raf && !reduceMotion && onScreen && !document.hidden) raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    readTheme()
    resize()
    start()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement)

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      onScreen ? start() : stop()
    })
    io.observe(canvas)

    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)

    const mo = new MutationObserver(() => {
      readTheme()
      paintBase()
      if (!raf) draw(false)
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero__canvas" />
}
