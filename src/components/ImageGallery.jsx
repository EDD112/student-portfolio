import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, ImageOff, X, ZoomIn } from 'lucide-react'

const CLOSE_MS = 220

function Lightbox({ images, startIndex, onClose, onIndexChange, label }) {
  const [index, setIndex] = useState(startIndex)
  const [closing, setClosing] = useState(false)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [dir, setDir] = useState(0) // -1 = came from left, 1 = came from right, 0 = first open
  const touchStart = useRef(null)
  const closeRef = useRef(null)
  const n = images.length

  const close = useCallback(() => {
    setClosing(true)
    setTimeout(onClose, CLOSE_MS)
  }, [onClose])

  const go = useCallback(
    (d) => {
      if (n < 2) return
      setDir(d)
      setIndex((i) => {
        const next = (i + d + n) % n
        onIndexChange(next)
        return next
      })
    },
    [n, onIndexChange],
  )

  useEffect(() => {
    const opener = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      opener?.focus?.()
    }
  }, [close, go])

  // Finger-follow swipe
  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX
    setDragging(true)
  }
  const onTouchMove = (e) => {
    if (touchStart.current == null) return
    setDragX(e.touches[0].clientX - touchStart.current)
  }
  const onTouchEnd = () => {
    if (touchStart.current == null) return
    const dx = dragX
    touchStart.current = null
    setDragging(false)
    setDragX(0)
    if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1)
  }

  const slideClass = dir === 0 ? '' : dir > 0 ? 'lightbox__img--from-right' : 'lightbox__img--from-left'

  return createPortal(
    <div
      className={`lightbox${closing ? ' is-closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${label} screenshots`}
      onClick={(e) => e.target === e.currentTarget && close()}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="lightbox__drag"
        style={{
          transform: `translateX(${dragX}px)`,
          transition: dragging ? 'none' : 'transform 260ms cubic-bezier(0.22, 0.61, 0.36, 1)',
        }}
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <img
          key={index}
          className={`lightbox__img ${slideClass}`}
          src={images[index]}
          alt={`${label} screenshot ${index + 1} of ${n}`}
          draggable="false"
        />
      </div>

      <button ref={closeRef} type="button" className="lightbox__btn lightbox__close" onClick={close} aria-label="Close">
        <X size={22} aria-hidden="true" />
      </button>

      {n > 1 && (
        <>
          <button type="button" className="lightbox__btn lightbox__prev" onClick={() => go(-1)} aria-label="Previous image">
            <ChevronLeft size={24} aria-hidden="true" />
          </button>
          <button type="button" className="lightbox__btn lightbox__next" onClick={() => go(1)} aria-label="Next image">
            <ChevronRight size={24} aria-hidden="true" />
          </button>
          <span className="lightbox__count">
            {index + 1} / {n}
          </span>
        </>
      )}
    </div>,
    document.body,
  )
}

export default function ImageGallery({ images, title, alt }) {
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const [failed, setFailed] = useState({})
  const trackRef = useRef(null)
  const n = images.length
  const label = alt || `${title}`

  const scrollTo = (i, behavior = 'smooth') => {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: el.clientWidth * i, behavior })
  }

  const onScroll = () => {
    const el = trackRef.current
    if (!el || !el.clientWidth) return
    const i = Math.round(el.scrollLeft / el.clientWidth)
    if (i !== index) setIndex(i)
  }

  // When the viewer closes, put the small carousel on the image you last saw
  useEffect(() => {
    if (!open) scrollTo(index, 'auto')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <div className="gallery">
      <div className="gallery__track" ref={trackRef} onScroll={onScroll}>
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            className="gallery__slide"
            onClick={() => {
              setIndex(i)
              setOpen(true)
            }}
            aria-label={`View larger: ${label}, image ${i + 1} of ${n}`}
          >
            {failed[i] ? (
              <span className="project-card__placeholder">
                <ImageOff size={28} aria-hidden="true" />
                <span>Image not found</span>
              </span>
            ) : (
              <img
                src={src}
                alt={`${label}, image ${i + 1} of ${n}`}
                width="1200"
                height="750"
                loading="lazy"
                decoding="async"
                draggable="false"
                onError={() => setFailed((f) => ({ ...f, [i]: true }))}
              />
            )}
          </button>
        ))}
      </div>

      <span className="gallery__zoom" aria-hidden="true">
        <ZoomIn size={16} />
      </span>

      {n > 1 && (
        <>
          <button
            type="button"
            className="gallery__nav gallery__nav--prev"
            onClick={() => scrollTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous image"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="gallery__nav gallery__nav--next"
            onClick={() => scrollTo(index + 1)}
            disabled={index === n - 1}
            aria-label="Next image"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
          <div className="gallery__dots">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                className="gallery__dot"
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => scrollTo(i)}
              />
            ))}
          </div>
        </>
      )}

      {open && (
        <Lightbox
          images={images}
          startIndex={index}
          onIndexChange={setIndex}
          onClose={() => setOpen(false)}
          label={label}
        />
      )}
    </div>
  )
}
