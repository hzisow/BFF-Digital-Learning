# Front-page photography

Drop real photos here and the front page picks them up on the next build. No
code change, no config — the filename is the wiring.

| Filename | Where it appears |
|---|---|
| `academy.jpg` | The BFF Academy card — the big one. Vrund's ask: a shot of a real in-person BFF tutoring session. |
| `activities.jpg` | The Games & Activities card. |
| `schools.jpg` | The schools / partners band near the bottom. |

`.jpg`, `.jpeg`, `.png` and `.webp` all work. Vite hashes and optimises them at
build time, so no CDN and no runtime fetch.

## What to shoot

These carry the whole page, so they matter more than any CSS here:

- **Real sessions, real students.** The entire point is that this does not look
  generated. Stock photography of unrelated people would be worse than the
  designed fallback, not better.
- **Landscape, at least 1600px wide.** The Academy card renders ~840px wide on a
  desktop and is cropped to 4:3, so shoot loose and leave headroom.
- **Natural light, documentary tone.** Someone mid-explanation at a whiteboard
  beats a posed group shot facing the camera.
- **Keep faces away from the bottom third** — that edge sits against the card's
  caption block.

## Consent

These are photographs of minors on a public site. Get whatever photo release the
school or the family uses before a face goes up here. If a usable release is not
in hand for a given shot, leave the file out — the fallback is designed to stand
on its own and the page does not look broken without it.
