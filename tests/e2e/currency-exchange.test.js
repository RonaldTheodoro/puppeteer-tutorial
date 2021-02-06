const puppeteer = require('puppeteer')

const { click, typeText } = require('../../lib/helpers')

describe('Currency exchange test', () => {
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

  it('Display currency exchange form', async () => {
    await page.waitForSelector('.nav-tabs')
    await click(page, '#pay_bills_tab')
    await page.waitForSelector('a[href="#ui-tabs-3"]')
    await click(page, 'a[href="#ui-tabs-3"]')
    await page.waitForSelector('#pc_purchase_currency_form')
  })

  it('Exchange currency', async () => {
    await page.select('#pc_currency', 'EUR')
    await typeText(page, '#pc_amount', '500')
    await click(page, '#pc_inDollars_true')
    await click(page, '#pc_calculate_costs')
    await click(page, '#purchase_cash')
    await page.waitForSelector('#alert_content')
  })
})
