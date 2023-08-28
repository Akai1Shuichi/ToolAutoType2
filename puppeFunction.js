const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
async function submit(x, y, signatureText, data) {
  const pathToExtension = require('path').join(__dirname, '1stCAPTCHA');

  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: [
      // '--incognito',
      '--window-size=384,525',
      `--window-position=0,0`,
      `--window-position=${x},${y}`,
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
    ],
    executablePath:
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    // executablePath(),
    // 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });

  const [page] = await browser.pages();

  await page.goto(data.selectName);
  await page.evaluate(() => {
    window.scrollTo(270, 0);
  });

  const name = data.name;
  const addressSent = data.addressSent;
  const addressMail = data.addressMail;
  const nameOwn = data.nameOwn;
  const showUrl = data.showUrl;
  const branch = data.branch;
  const countryName = data.countryName;
  const trademarkRegister = data.trademarkRegister;
  const provideUrl = data.provideUrl;
  const provideInfo = data.provideInfo;

  const acceptButton = await page.$(
    'button[data-cookiebanner="accept_button"]'
  );
  if (acceptButton) {
    // await page.locator('button[data-cookiebanner="accept_button"]').click();
    acceptButton.click();
    await new Promise((resolve) => setTimeout(resolve, 500));
    await page.evaluate(() => {
      window.scrollTo(270, 0);
    });
  }
  // 1 , 2 khac nhau email va nuoc
  if (data.selectInnerName === '1') {
    // Click
    // await page.locator('[id="666057160210034.0"]').click();
    await page.locator('[id="250116565117827.0"]').click();

    // Điền tên
    await page.type('[id="474274485979849"]', name);

    // Điền Địa chỉ gửi thư
    await page.type('[id="364697220303015"]', addressSent);

    // Điền địa chỉ mail
    await page.type('[id="244971059275452"]', addressMail);
    await page.type('[id="755605467935533"]', addressMail);

    // Điền tên nước
    await page.select('[id="645486236964608"]', countryName);

    // Điền tên chủ sở hữu
    await page.type('[id="1467491100178767"]', nameOwn);

    // Click nội dung báo cáo
    await page.locator('[id="1076937109041279.0"]').click();
    await page.locator('[id="1076937109041279.2"]').click();

    // Điền liên kết sự hiện diện
    await page.type('[id="173734026110493"]', showUrl);

    // Link cung cấp các liên kết URL
    await page.type('[id="388149281267730"]', provideUrl);

    // Cung cấp thêm thông tin
    await page.type('[id="451242651624945"]', provideInfo);

    // Chu ky dien tu
    await page.type('[id="159694930852744"]', signatureText);
    // Click vao submit
    await page.locator('._42ft').click();
    await new Promise((resolve) => setTimeout(resolve, 20000));
    await page.locator('[id="captcha_dialog_submit_button"]').click();
  } else if (data.selectInnerName === '2') {
    // Click
    // await page.locator('[id="666057160210034.0"]').click();
    await page.locator('[id="250116565117827.0"]').click();

    // Điền tên
    await page.type('[id="474274485979849"]', name);

    // Điền Địa chỉ gửi thư
    await page.type('[id="364697220303015"]', addressSent);

    // Điền địa chỉ mail
    await page.type('[id="367587743601218"]', addressMail);
    await page.type('[id="254868214933490"]', addressMail);

    // Điền tên chủ sở hữu
    await page.type('[id="1467491100178767"]', nameOwn);

    // Điền tên nước
    await page.select('[id="785160866594563"]', countryName);

    // Click nội dung báo cáo
    await page.locator('[id="1076937109041279.0"]').click();
    await page.locator('[id="1076937109041279.3"]').click();

    // Điền liên kết sự hiện diện
    await page.type('[id="173734026110493"]', showUrl);

    // Link cung cấp các liên kết URL
    await page.type('[id="388149281267730"]', provideUrl);

    // Cung cấp thêm thông tin
    await page.type('[id="451242651624945"]', provideInfo);

    // Chu ky dien tu
    await page.type('[id="159694930852744"]', signatureText);

    // Click vao submit
    await page.locator('._42ft').click();
    await new Promise((resolve) => setTimeout(resolve, 20000));
    await page.locator('[id="captcha_dialog_submit_button"]').click();
  }

  await new Promise((resolve) => setTimeout(resolve, 5000));
  await browser.close();
}
module.exports = {
  submit,
};
