const puppeteer = require('puppeteer')

describe('My first puppeteer test', () => {
  it('should launch the browser', async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 100 })
    const page = await browser.newPage()
    await page.goto('http://example.com/')
    await page.waitForSelector('h1')
    await page.goto('https://dev.to')
    await page.waitForSelector('#body-styles')
    await page.goBack()
    await page.waitForSelector('h1')
    await page.goForward()
    await page.waitForSelector('#body-styles')

    await browser.close()
  })
})
