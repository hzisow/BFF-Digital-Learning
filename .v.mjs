import { chromium } from 'playwright'
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const page = await (await b.newContext({ viewport: { width: 1100, height: 900 } })).newPage()
const errs = []
page.on('pageerror', (e) => errs.push(e.message))

for (const slug of ['earning-income', 'taxes-deep-dive', 'crypto-and-scams']) {
  await page.goto(`http://localhost:4186/lessons/${slug}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  // Walk to the video step using the lesson's own step count.
  const info = await page.evaluate(() => {
    const m = document.body.innerText.match(/STEP\s+(\d+)\s*\/\s*(\d+)/i)
    return m ? { total: Number(m[2]) } : null
  })
  let found = null
  for (let i = 0; i < (info?.total ?? 0); i++) {
    const h = await page.evaluate(() => document.querySelector('h1,h2')?.textContent?.trim() ?? '')
    if (/^(Watch|Míralo|观看)/.test(h)) { found = h; break }
    const next = page.locator('.lz-actionbar button, .lz-actionbar a').last()
    if (!(await next.count())) break
    await next.click().catch(() => {})
    await page.waitForTimeout(120)
  }
  console.log(`${slug.padEnd(26)} ${found ?? '(video step not reached)'}`)
}
console.log('page errors:', errs.length ? errs.slice(0, 2) : 'none')
await b.close()
