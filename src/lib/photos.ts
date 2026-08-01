// Front-page photography, wired by filename.
//
// A reviewer's note on the front page was that it looked generated, and the
// specific fix asked for was real photographs of BFF's in-person tutoring behind
// the two main entry points. Photos of real students take time to collect and
// clear, so the page cannot depend on them existing — but it also should not
// need a code change on the day they arrive.
//
// So: drop `academy.jpg` into src/assets/photos and the Academy card is a
// photograph on the next build. Take it away and the card falls back to a
// designed ink panel that stands on its own. Nothing else moves.
//
// `eager: true` resolves at build time, which is what makes `hasPhoto` a real
// answer rather than a runtime guess — no flash of a fallback that then swaps to
// an image, and no request for a file that was never there.

const files = import.meta.glob<{ default: string }>(
  '../assets/photos/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true },
)

/** Slots the front page knows how to fill. Filename minus extension. */
export type PhotoSlot = 'academy' | 'activities' | 'schools'

const bySlot = new Map<string, string>()
for (const [path, mod] of Object.entries(files)) {
  const name = path.split('/').pop()?.replace(/\.[^.]+$/, '').toLowerCase()
  // First one wins, so academy.jpg and academy.png cannot fight over the slot.
  if (name && !bySlot.has(name)) bySlot.set(name, mod.default)
}

/** The resolved, hashed URL for a slot, or null when no file has been added. */
export function photo(slot: PhotoSlot): string | null {
  return bySlot.get(slot) ?? null
}

export function hasPhoto(slot: PhotoSlot): boolean {
  return bySlot.has(slot)
}
