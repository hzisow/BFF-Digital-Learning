export function Logo({
  reversed = false,
  className = 'h-10',
  decorative = false,
}: {
  reversed?: boolean
  className?: string
  /** Render as a purely decorative image (hidden from assistive tech). */
  decorative?: boolean
}) {
  const src = `${import.meta.env.BASE_URL}brand/${reversed ? 'logo-reversed.png' : 'logo.png'}`
  return (
    <img
      src={src}
      alt={decorative ? '' : 'BFF of America, Building Financial Futures of America'}
      aria-hidden={decorative || undefined}
      className={className}
    />
  )
}
