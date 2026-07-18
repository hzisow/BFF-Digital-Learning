export function Logo({ reversed = false, className = 'h-10' }: { reversed?: boolean; className?: string }) {
  const src = `${import.meta.env.BASE_URL}brand/${reversed ? 'logo-reversed.png' : 'logo.png'}`
  return <img src={src} alt="BFF of America — Building Financial Futures of America" className={className} />
}
