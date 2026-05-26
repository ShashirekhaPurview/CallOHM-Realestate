import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage()
await page.setViewportSize({ width: 1440, height: 900 })
await page.goto('http://localhost:5173')
await page.evaluate(() => document.querySelector('#how-it-works').scrollIntoView({ behavior: 'instant' }))
await page.waitForTimeout(1000)
await page.screenshot({ path: 'hiw-scroll.png' })
await browser.close()
