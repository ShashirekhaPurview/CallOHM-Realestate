import { chromium } from 'playwright'
const b = await chromium.launch()
const p = await b.newPage()
await p.setViewportSize({ width: 1440, height: 900 })
await p.goto('http://localhost:5173', { waitUntil: 'networkidle' })

// scroll to features
await p.evaluate(() => document.getElementById('features').scrollIntoView())
await p.waitForTimeout(600)
await p.screenshot({ path: 'ss-features.png' })

// scroll to how-it-works
await p.evaluate(() => document.getElementById('how-it-works').scrollIntoView())
await p.waitForTimeout(800)
await p.screenshot({ path: 'ss-hiw.png' })

await b.close()
