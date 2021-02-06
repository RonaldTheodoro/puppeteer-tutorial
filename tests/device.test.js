const puppeteer = require('puppeteer')

describe('Device Emulation', () => {
  let browser
  let page

  before(async () => {
    browser = await puppeteer.launch()
    const context = await browser.createIncognitoBrowserContext()
    page = await context.newPage()

    await page.setDefaultTimeout(10000)
    await page.setDefaultNavigationTimeout(20000)
  })

  after(async () => {
    await browser.close()
  })

  it('Desktop device test', async () => {
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto('http://www.example.com')
  })

  it('Table device test', async () => {
    const tablet = puppeteer.devices['iPad landscape']
    await page.emulate(tablet)
    await page.goto('http://www.example.com')
  })

  it('Mobile device test', async () => {
    const mobile = puppeteer.devices['iPhone X']
    await page.emulate(mobile)
    await page.goto('http://www.example.com')
  })
})
