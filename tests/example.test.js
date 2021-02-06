const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('My first puppeteer test', () => {
  it('should launch the browser', async () => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.setDefaultTimeout(10000)
    await page.setDefaultNavigationTimeout(20000)

    await page.goto('http://example.com/')
    const title = await page.title()
    const url = await page.url()
    const text = await page.$eval('h1', (element) => element.textContent)
    const count = await page.$$eval('p', (element) => element.length)

    expect(title).to.be.a('string', 'Example Domain')
    expect(url).to.include('example.com')
    expect(text).to.be.a('string', 'Example Domain')
    expect(count).to.equal(2)

    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.type('#searchTerm', 'Hello there')
    await page.keyboard.press('Enter', { delay: 10 })
    await page.waitForSelector('h2')
    console.log(await page.$eval('h2', (element) => element.textContent))

    await page.waitForTimeout(5000)

    await browser.close()
  })
})
