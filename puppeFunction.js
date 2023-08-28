const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { executablePath } = require('puppeteer');
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
  if (data.selectInnerName === '1') {
    // Click
    await page.locator('[id="666057160210034.0"]').click();
    await page.locator('[id="666526966785308.0"]').click();

    // Điền tên
    await page.type('[id="213007228830668"]', name);

    // Điền Địa chỉ gửi thư
    await page.type('[id="429750330422486"]', addressSent);

    // Điền địa chỉ mail
    await page.type('[id="622301541289923"]', addressMail);
    await page.type('[id="1376658769024639"]', addressMail);

    // Điền tên chủ sở hữu
    await page.type('[id="1193690677387082"]', nameOwn);

    // Điền liên kết sự hiện diện
    await page.type('[id="817261985076647"]', showUrl);

    // Điền nhãn hiệu
    await page.type('[id="1876333722592163"]', branch);

    // Điền tên nước
    await page.select('[id="3411356655770500"]', countryName);

    // Điền sổ đăng ký nhãn hiệu
    await page.type('[id="332711233753465"]', trademarkRegister);

    // Click nội dung báo cáo
    await page.locator('[id="1112475925434379.0"]').click();
    await page.locator('[id="1112475925434379.3"]').click();

    // Link cung cấp các liên kết URL
    await page.type('[id="1622541521292980"]', provideUrl);
    // Cung cấp thêm thông tin
    await page.type('[id="125859267561673"]', provideInfo);

    // Chu ky dien tu
    await page.type('[id="348034581955173"]', signatureText);

    // Click vao submit
    await page.locator('._42ft').click();
  } else if (data.selectInnerName === '2') {
    await page.locator('[id="666526966785308.0"]').click();

    // Điền tên
    await page.type('[id="213007228830668"]', name);

    // Điền Địa chỉ gửi thư
    await page.type('[id="429750330422486"]', addressSent);

    // Điền địa chỉ mail
    await page.type('[id="417723801904130"]', addressMail);
    await page.type('[id="553785781487202"]', addressMail);

    // Điền tên chủ sở hữu
    await page.type('[id="723355745001537"]', nameOwn);

    // Điền liên kết sự hiện diện
    await page.type('[id="143676840909563"]', showUrl);

    // Điền nhãn hiệu
    await page.type('[id="1876333722592163"]', branch);

    // Điền tên nước
    await page.select('[id="1287167821880475"]', countryName);

    // Điền sổ đăng ký nhãn hiệu
    await page.type('[id="522072729133382"]', trademarkRegister);

    // Click nội dung báo cáo
    await page.locator('[id="1112475925434379.0"]').click();
    await page.locator('[id="1112475925434379.3"]').click();

    // Link cung cấp các liên kết URL
    await page.type('[id="774288576003882"]', provideUrl);

    // Cung cấp thêm thông tin
    await page.type('[id="125859267561673"]', provideInfo);

    // Chu ky dien tu
    await page.type('[id="348034581955173"]', signatureText);

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
