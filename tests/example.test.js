const puppeteer = require('puppeteer')

describe('My first puppeteer test', () => {
  it('should launch the browser', async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 10 })
    const page = await browser.newPage()
    await page.goto('http://example.com/')
    const text = await page.$eval('h1', (element) => element.textContent)

    console.log(`text: ${text}`)

    await browser.close()
  })
})
