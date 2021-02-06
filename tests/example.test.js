const puppeteer = require('puppeteer')

describe('My first puppeteer test', () => {
  it('should launch the browser', async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 10 })
    const page = await browser.newPage()
    await page.goto('http://example.com/')
    const title = await page.title()
    const url = await page.url()

    console.log(`title: ${title}`)
    console.log(`url: ${url}`)
    await browser.close()
  })
})
