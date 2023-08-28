const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { executablePath } = require('puppeteer');

console.log(executablePath());
(async () => {
  const pathToExtension = require('path').join(__dirname, '1stCAPTCHA');

  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--window-size=384,525',
      `--window-position=0,0`,
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
    ],
    executablePath:
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });

  const [page] = await browser.pages();
  await page.evaluate(() => {
    window.scrollTo(0, 50);
  });
  // Opening a page
  await page.goto('https://2captcha.com/demo/recaptcha-v2');

  // // Waiting for the element with the CSS selector ".captcha-solver" to be available
  // await page.waitForSelector('.captcha-solver');
  // // Click on the element with the specified selector
  // await page.click('.captcha-solver');
  // // By default, waitForSelector waits for 30 seconds, but this time is usually not enough, so we specify the timeout value manually with the second parameter. The timeout value is specified in "ms".
  // //   await page.waitForSelector(`.captcha-solver[data-state="solved"]`, {
  // //     timeout: 180000,
  // //   });

  await new Promise((resolve) => setTimeout(resolve, 30000));
  // Click on the "Check" button to check the successful solution of the captcha.
  await page.click("button[type='submit']");
})();
