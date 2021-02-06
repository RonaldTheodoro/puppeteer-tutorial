const puppeteer = require('puppeteer')

const { click, typeText } = require('../../lib/helpers')

describe('Login test', () => {
  let browser
  let page

  before(async () => {
    browser = await puppeteer.launch({
      headless: false,
      sloMo: 10,
      ignoreHTTPSErrors: true,
    })
    page = await browser.newPage()

    await page.setDefaultTimeout(10000)
    await page.setDefaultNavigationTimeout(20000)
  })

  after(async () => {
    await browser.close()
  })

  it('Login test - invalid credentials', async () => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await click(page, '#signin_button')
    await page.waitForSelector('#login_form')
    await typeText(page, '#user_login', 'invalid credential')
    await typeText(page, '#user_password', 'invalid password')
    await click(page, '#user_remember_me')
    await click(page, 'input[name="submit"]')
    await page.waitForSelector('.alert-error')
  })

  it('Login test - valid credentials', async () => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await click(page, '#signin_button')
    await page.waitForSelector('#login_form')
    await typeText(page, '#user_login', 'username')
    await typeText(page, '#user_password', 'password')
    await click(page, '#user_remember_me')
    await click(page, 'input[name="submit"]')
    await page.waitForSelector('#settingsBox')
  })
})
