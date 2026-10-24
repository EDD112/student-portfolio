import { memo, useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { ChevronDown, ExternalLink, Github, ImageOff, TriangleAlert } from 'lucide-react'
import ImageGallery from './ImageGallery'

// Accepts a single string, an array of strings, or either one under `image` / `images`.
function getImages(project) {
  return [project.images, project.image].flat().filter((s) => typeof s === 'string' && s.trim() !== '')
}

const LINES = 3
const LINE_HEIGHT = 1.6
// A gentle ease-in-out: starts softly, glides, settles softly (no sudden first-frame jump).
export const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'
export const MS = 450

const statusMap = {
  'in-progress': { label: 'In progress', cls: 'status--progress' },
  early: { label: 'Early project', cls: 'status--early' },
  completed: { label: 'Completed', cls: 'status--done' },
}

/*
  How the animation works (why it is smooth)
  ------------------------------------------
  Everything that expands lives in ONE clipped box (`region`): the description and the
  hidden details. The only thing that animates is that box's pixel height, with a single
  CSS transition. The "See more" button sits right under it, so it simply rides down with it.

  Measured pixel heights are used (instead of height:auto) because browsers can only
  transition between real numbers.

  Equal heights: when two cards in the same row are open, the shorter one is given `extra`
  pixels (worked out by Projects.jsx). That extra is folded into the same height transition,
  so the card grows to match its neighbour in sync - no instant snap.
*/
function ProjectCard({
  project,
  index = 0,
  expanded: expandedProp,
  extra = 0,
  animate = true,
  onToggle,
  onMeasure,
}) {
  const images = getImages(project)
  const uid = useId()
  const descId = `${uid}-desc`
  const detailsId = `${uid}-details`

  // Controlled by the parent when `expanded` is passed, otherwise it manages itself
  const [localExpanded, setLocalExpanded] = useState(false)
  const isControlled = expandedProp !== undefined
  const expanded = isControlled ? expandedProp : localExpanded
  const toggle = () => (isControlled ? onToggle?.(index) : setLocalExpanded((v) => !v))

  // Optional: a card with no `status` simply shows no badge
  const status = project.status ? statusMap[project.status] || statusMap.completed : null

  // What the card has. Missing tech stack, demo or source parts are simply skipped.
  const techList = project.tech ?? []
  const detailsText = project.details ?? project.contribution
  const detailsLabel = project.detailsLabel ?? 'My contribution'
  const hasBottom = techList.length > 0 || Boolean(project.live || project.source)

  const articleRef = useRef(null)
  const regionRef = useRef(null)
  const fillRef = useRef(null)
  const descRef = useRef(null)
  const bottomRef = useRef(null)
  const lastWidth = useRef(-1)

  // closed = height showing ~3 lines, open = height of everything (no extra space)
  const [dims, setDims] = useState(null)

  const measure = useCallback(() => {
    const art = articleRef.current
    const region = regionRef.current
    const fill = fillRef.current
    const desc = descRef.current
    const bottom = bottomRef.current
    if (!art || !region || !fill || !desc || !bottom) return

    const fullDesc = desc.getBoundingClientRect().height
    const clamp = parseFloat(getComputedStyle(desc).fontSize) * LINE_HEIGHT * LINES
    const overflowing = fullDesc > clamp + 2
    const closedH = overflowing ? clamp : fullDesc

    // Take out whatever "equal height" space is currently applied, so we get the natural height
    const cs = getComputedStyle(bottom)
    const appliedExtra = parseFloat(hasBottom ? cs.marginTop : cs.height) || 0
    const openH = fill.getBoundingClientRect().height - appliedExtra

    // Everything in the card except the animated box (image, title, button, padding)
    const chrome = art.getBoundingClientRect().height - region.getBoundingClientRect().height

    setDims((d) =>
      d && Math.abs(d.closedH - closedH) < 0.25 && Math.abs(d.openH - openH) < 0.25 && d.overflowing === overflowing
        ? d
        : { closedH, openH, overflowing },
    )
    onMeasure?.(index, chrome + openH)
  }, [index, onMeasure, hasBottom])

  // Measure before the first paint, and again if the text changes
  useLayoutEffect(() => {
    measure()
  }, [measure, project.description, project.contribution, project.details, project.note])

  // Re-measure only when the card's WIDTH changes (text re-wraps) or fonts finish loading.
  // Height is ignored on purpose, because it changes every frame while animating.
  useEffect(() => {
    const el = regionRef.current
    let ro
    if (el && 'ResizeObserver' in window) {
      ro = new ResizeObserver(([entry]) => {
        const w = Math.round(entry.contentRect.width)
        if (w === lastWidth.current) return
        lastWidth.current = w
        measure()
      })
      ro.observe(el)
    }
    document.fonts?.ready?.then(measure)
    return () => ro?.disconnect()
  }, [measure])

  const ready = dims !== null
  const targetHeight = ready ? (expanded ? dims.openH + extra : dims.closedH) : undefined
  const showFade = ready && dims.overflowing && !expanded
  const fadeH = ready ? dims.closedH * 0.45 : 0

  const heightTransition = animate ? `height ${MS}ms ${EASE}` : 'none'

  return (
    // The card keeps its own height; closed cards stay short, open cards are sized by `extra`
    <article
      ref={articleRef}
      className="project-card"
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <div className="project-card__media" style={{ flexShrink: 0 }}>
        {images.length > 0 ? (
          <ImageGallery images={images} title={project.title} alt={project.imageAlt} />
        ) : (
          <div className="project-card__placeholder" role="img" aria-label="Project screenshot placeholder">
            <ImageOff size={28} aria-hidden="true" />
            <span>Screenshot placeholder</span>
          </div>
        )}
        {status && <span className={`status ${status.cls}`}>{status.label}</span>}
      </div>

      <div className="project-card__body" style={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}>
        <h3 className="project-card__title">{project.title}</h3>

        <div style={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}>
          {/* The ONE animated box. Its height goes closed -> open with a single transition. */}
          <div
            ref={regionRef}
            style={{
              position: 'relative',
              overflow: 'hidden',
              flexShrink: 0,
              height: targetHeight,
              transition: heightTransition,
            }}
          >
            <div ref={fillRef}>
              {/* Always in the DOM; the box clips it to ~3 lines until expanded */}
              <p id={descId} ref={descRef} className="project-card__desc" style={{ lineHeight: LINE_HEIGHT }}>
                {project.description}
              </p>

              {/* Hidden until "See more" (visibility keeps hidden links out of the tab order) */}
              <div
                id={detailsId}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  paddingTop: '0.75rem',
                  visibility: expanded ? 'visible' : 'hidden',
                  transition: `visibility 0s linear ${expanded ? '0s' : `${MS}ms`}`,
                }}
              >
                {detailsText && (
                  <div className="project-card__contrib">
                    <span className="project-card__label">{detailsLabel}</span>
                    {detailsText}
                  </div>
                )}

                {project.note && (
                  <p className="project-card__note" role="note">
                    <TriangleAlert size={16} aria-hidden="true" />
                    <span>{project.note}</span>
                  </p>
                )}

                {/* Tech stack + buttons. `extra` pushes them to the bottom when this card
                    is shorter than an open neighbour in the same row. */}
                {hasBottom && (
                <div
                  ref={bottomRef}
                  style={{
                    marginTop: extra,
                    transition: animate ? `margin-top ${MS}ms ${EASE}` : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    alignItems: 'flex-start',
                  }}
                >
                  {techList.length > 0 && (
                    <ul className="chips chips--small" aria-label="Technologies used">
                      {techList.map((t, i) => (
                        <li key={i} className="chip">
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}

                  {(project.live || project.source) && (
                    <div
                      className="project-card__links"
                      style={{
                        marginTop: 0,
                        paddingTop: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                      }}
                    >
                      {project.live && (
                        <a
                          className="btn btn--primary btn--sm"
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={16} aria-hidden="true" />
                          Live demo
                          <span className="sr-only"> of {project.title} (opens in a new tab)</span>
                        </a>
                      )}
                      {project.source && (
                        <a
                          className="btn btn--secondary btn--sm"
                          href={project.source}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github size={16} aria-hidden="true" />
                          Source code
                          <span className="sr-only"> for {project.title} (opens in a new tab)</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
                )}
              </div>

              {/* No tech/links: this spacer carries the equal-height extra instead */}
              {!hasBottom && (
                <div
                  ref={bottomRef}
                  aria-hidden="true"
                  style={{ height: extra, transition: animate ? `height ${MS}ms ${EASE}` : 'none' }}
                />
              )}
            </div>

            {/* Soft fade on the 3rd line. It is an overlay, so only its opacity animates. */}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: ready ? dims.closedH - fadeH : 0,
                height: fadeH,
                background: 'linear-gradient(to bottom, transparent, var(--surface))',
                pointerEvents: 'none',
                opacity: showFade ? 1 : 0,
                // fades out right away on open, fades back in near the end of the close
                transition: animate ? `opacity 180ms linear ${expanded ? '0ms' : `${MS - 180}ms`}` : 'none',
              }}
            />
          </div>

          {/* The ONE toggle: always sits at the very bottom of the card */}
          <div style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
            <button
              type="button"
              className="expandable__toggle"
              onClick={toggle}
              aria-expanded={expanded}
              aria-controls={`${descId} ${detailsId}`}
            >
              {expanded ? 'See less' : 'See more'}
              <ChevronDown
                size={16}
                aria-hidden="true"
                style={{
                  transition: animate ? `transform ${MS}ms ${EASE}` : 'none',
                  transform: expanded ? 'rotate(180deg)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

// memo: toggling one card no longer re-renders the other cards (and their image galleries)
export default memo(ProjectCard)
