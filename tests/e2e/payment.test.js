const puppeteer = require('puppeteer')

const { click, typeText } = require('../../lib/helpers')

describe('Payment test', () => {
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

    await page.goto('http://zero.webappsecurity.com/index.html')
    await click(page, '#signin_button')
    await page.waitForSelector('#login_form')
    await typeText(page, '#user_login', 'username')
    await typeText(page, '#user_password', 'password')
    await click(page, '#user_remember_me')
    await click(page, 'input[name="submit"]')
    await page.waitForSelector('#settingsBox')
  })

  after(async () => {
    await browser.close()
  })

  it('Display payment form', async () => {
    await page.waitForSelector('.nav-tabs')
    await click(page, '#pay_bills_tab')
    await page.waitForSelector('.board')
  })

  it('Make payment', async () => {
    await page.select('#sp_payee', 'Bank of America')
    await page.select('#sp_account', 'Credit Card')
    await typeText(page, '#sp_amount', '500')
    await typeText(page, '#sp_date', '2021-02-02')
    await page.keyboard.press('Enter')
    await typeText(page, '#sp_description', 'xelo')
    await click(page, '#pay_saved_payees')
    await page.waitForSelector('.alert-success')
  })
})
