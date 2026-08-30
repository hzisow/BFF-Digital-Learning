// The LinkedIn mark.
//
// Not in src/lib/icons.tsx. That registry is the source of truth for *content*
// symbols — the key a lesson or a badge stores instead of an emoji — and it is
// typed to LucideIcon. This is a third-party brand mark used once, as chrome on
// one button, so it lives on its own rather than widening the registry's type
// to admit something content can never reference.
//
// Path taken verbatim from Font Awesome Free 7.3.1 (`linkedin-in`), icons
// licensed CC BY 4.0 — https://fontawesome.com/license/free. lucide, the set the
// rest of the app uses, dropped its brand icons over trademark, so it has none
// to offer. Copied as a single path rather than added as a dependency: one glyph
// is not worth a package, and inlining keeps it out of the bundle graph.
//
// The bare wordmark rather than the mark-in-a-rounded-square: the boxed version
// is a solid slab that reads far heavier than the stroked lucide icons it sits
// beside, and filled with the button's white it inverts LinkedIn's own colours
// into a white chip. Two letters at `currentColor` carry the same optical weight
// as the icons around them and stay recognisable at 16px.

export function LinkedInIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 448 512"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M100.3 448l-92.9 0 0-299.1 92.9 0 0 299.1zM53.8 108.1C24.1 108.1 0 83.5 0 53.8 0 39.5 5.7 25.9 15.8 15.8s23.8-15.8 38-15.8 27.9 5.7 38 15.8 15.8 23.8 15.8 38c0 29.7-24.1 54.3-53.8 54.3zM447.9 448l-92.7 0 0-145.6c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7l0 148.1-92.8 0 0-299.1 89.1 0 0 40.8 1.3 0c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3l0 164.3-.1 0z" />
    </svg>
  )
}
