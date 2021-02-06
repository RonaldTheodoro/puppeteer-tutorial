const puppeteer = require('puppeteer')

describe('My first puppeteer test', () => {
  it('should launch the browser', async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 10 })
    const page = await browser.newPage()
    const name = 'shimira'
    await page.goto('https://devexpress.github.io/testcafe/example/')
    await page.type('#developer-name', name, { delay: 0 })
    await page.click('#tried-test-cafe', { clickCount: 1 })
    await page.select('#preferred-interface', 'JavaScript API')
    await page.type('#comments', 'I am a machine')
    await page.click('#submit-button')
    await page.waitForSelector('h1')
    await page.waitForTimeout(2000)

    await browser.close()
  })
})
