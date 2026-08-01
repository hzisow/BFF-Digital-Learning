// A photograph, or a designed panel that does not look like a missing photograph.
//
// The front page is built around two large image-led entry points. Until real
// session photography is cleared and dropped into src/assets/photos, this
// renders an ink panel with the lesson-canvas motif instead — the point being
// that the page reads as finished either way, so nobody is tempted to fill the
// hole with stock photography of strangers.
//
// Deliberately no gradient scrim and no text sitting on top of the image. Text
// over a darkened photo is the single most recognisable "generated landing page"
// move; the caption lives underneath in its own block, the way a magazine would
// set it.

import { photo, type PhotoSlot } from '../lib/photos'

export default function PhotoPanel({
  slot,
  className = '',
  motif = 'rings',
}: {
  slot: PhotoSlot
  className?: string
  /** Which fallback drawing to use, so two adjacent panels do not look identical. */
  motif?: 'rings' | 'bars' | 'grid'
}) {
  const src = photo(slot)

  if (src) {
    return (
      <img
        src={src}
        // Decorative: every panel is inside a link whose visible label already
        // names the destination, so alt text here would be read out twice.
        alt=""
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }

  return (
    <div
      aria-hidden="true"
      className={`relative h-full w-full overflow-hidden bg-bronze ${className}`}
    >
      {/* Three genuinely different drawings. Repeating one motif across
          adjacent panels is what made the placeholder read as a bug rather than
          a treatment. */}
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        {motif === 'rings' && (
          <g fill="none" stroke="#e8c98a">
            <circle cx="200" cy="150" r="52" strokeOpacity="0.34" />
            <circle cx="200" cy="150" r="98" strokeOpacity="0.24" />
            <circle cx="200" cy="150" r="144" strokeOpacity="0.16" />
            <circle cx="200" cy="150" r="190" strokeOpacity="0.09" />
            <circle cx="200" cy="150" r="236" strokeOpacity="0.05" />
            <circle cx="200" cy="150" r="14" stroke="#c9a86a" strokeOpacity="0.5" />
          </g>
        )}
        {motif === 'bars' && (
          <g>
            <g fill="#e8c98a">
              <rect x="46" y="188" width="46" height="112" fillOpacity="0.16" />
              <rect x="112" y="142" width="46" height="158" fillOpacity="0.22" />
              <rect x="178" y="96" width="46" height="204" fillOpacity="0.3" />
            </g>
            <rect x="244" y="52" width="46" height="248" fill="#c9a86a" fillOpacity="0.26" />
            <rect x="310" y="118" width="46" height="182" fill="#e8c98a" fillOpacity="0.14" />
          </g>
        )}
        {motif === 'grid' && (
          <g stroke="#faf8f5" strokeOpacity="0.08" fill="none">
            {Array.from({ length: 9 }, (_, i) => (
              <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="300" />
            ))}
            {Array.from({ length: 7 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} />
            ))}
            <rect x="100" y="50" width="100" height="100" fill="#e8c98a" fillOpacity="0.2" stroke="none" />
            <rect x="200" y="150" width="50" height="50" fill="#c9a86a" fillOpacity="0.28" stroke="none" />
            <rect x="250" y="100" width="50" height="50" fill="#e8c98a" fillOpacity="0.12" stroke="none" />
          </g>
        )}
      </svg>
    </div>
  )
}
