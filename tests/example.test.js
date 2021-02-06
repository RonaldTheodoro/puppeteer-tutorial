const puppeteer = require('puppeteer')

describe('My first puppeteer test', () => {
  it('should launch the browser', async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 10 })
    const page = await browser.newPage()
    await page.goto('http://example.com/')
    const text = await page.$eval('h1', (element) => element.textContent)
    const count = await page.$$eval('p', (element) => element.length)

    console.log(`text: ${text}`)
    console.log(`count: ${count}`)

    await browser.close()
  })
})
