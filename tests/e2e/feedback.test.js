const puppeteer = require('puppeteer')
const expect = require('chai').expect

const { click, typeText } = require('../../lib/helpers')


describe('Feedback test', () => {
  let browser
  let page

  before(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage()

    await page.setDefaultTimeout(10000)
    await page.setDefaultNavigationTimeout(20000)
  })

  after(async () => {
    await browser.close()
  })

  it('Display feedback form', async () => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await click(page, '#feedback')
  })
  
  it('Submit feedback form', async () => {
    await page.waitForSelector('form')
    await typeText(page, '#name', 'Shimira')
    await typeText(page, '#email', 'shimira@gmail.com')
    await typeText(page, '#subject', 'xelo')
    await typeText(page, '#comment', 'Shimira bring me the ice')
    await click(page, 'input[name="submit"]')
  })
  
  it('Display results page', async () => {
    await page.waitForSelector('#feedback-title')
    const url = await page.url()
    expect(url).to.include('/sendFeedback.html')
  })
})
