const puppeteer = require('puppeteer')

describe('My first puppeteer test', () => {
  it('should launch the browser', async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 100 })
    const page = await browser.newPage()
    await page.goto('https://devexpress.github.io/testcafe/example/')
    await page.type('#developer-name', 'shimira', { delay: 0 })
    await page.waitForTimeout(5000)

    await browser.close()
  })
})
