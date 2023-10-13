const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

let browserArray = [];
async function submit(x, y, signatureText, data, callback) {
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
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
    ],
    executablePath:
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });
  browserArray.push(browser);
  const [page] = await browser.pages();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
  );
  await page.goto(data.selectName);
  await page.evaluate(() => {
    window.scrollTo(270, 0);
  });

  const name = data.name;
  const addressSent = data.addressSent;
  const addressMail = data.addressMail;
  const nameOwn = data.nameOwn;
  const showUrl = data.showUrl;
  // const branch = data.branch;
  const countryName = data.countryName;
  // const trademarkRegister = data.trademarkRegister;
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

    // Mô tả nội dung bản quyền
    await page.select('[id="418475341579315"]', 'Photo');

    // Click nội dung báo cáo
    await page.locator('[id="1076937109041279.0"]').click();
    await page.locator('[id="1076937109041279.2"]').click();

    // Điền liên kết sự hiện diện
    await page.type('[id="173734026110493"]', showUrl);

    // Link cung cấp các liên kết URL
    await page.type('[id="388149281267730"]', provideUrl);

    // Mô tả nôi dung báo cáo
    await page.select('[id="136284146523176"]', 'This content copies my work');

    // Cung cấp thêm thông tin
    await page.type('[id="451242651624945"]', provideInfo);

    // Chu ky dien tu
    await page.type('[id="159694930852744"]', signatureText);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Click vao submit
    await page.locator('._42ft').click();

    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Waiting for the element with the CSS selector ".captcha-solver" to be available

    // Đợi iframe xuất hiên
    await page.waitForSelector('#captcha-recaptcha');
    // Truy cập vào iframe bằng cách sử dụng page.frame()
    const iframeHandle = await page.$('#captcha-recaptcha');
    const iframe = await iframeHandle.contentFrame();

    await iframe.waitForSelector('.captcha-solver');
    await iframe.click('.captcha-solver');
    try {
      await iframe.waitForSelector('.captcha-solver[data-state="solved"]', {
        timeout: 180000,
      });
    } catch (e) {
      throw new Error();
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await page.locator('.pam ._42ft').click();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await browser.close();
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

    // Mô tả nội dung bản quyền
    await page.select('[id="418475341579315"]', 'Photo');

    // Click nội dung báo cáo
    await page.locator('[id="1076937109041279.0"]').click();
    await page.locator('[id="1076937109041279.3"]').click();

    // Điền liên kết sự hiện diện
    await page.type('[id="173734026110493"]', showUrl);

    // Link cung cấp các liên kết URL
    await page.type('[id="388149281267730"]', provideUrl);

    // Mô tả nội dung báo cáo
    await page.select('[id="136284146523176"]', 'This content copies my work');

    // Cung cấp thêm thông tin
    await page.type('[id="451242651624945"]', provideInfo);

    // Chu ky dien tu
    await page.type('[id="159694930852744"]', signatureText);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Click vao submit
    await page.locator('._42ft').click();

    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Waiting for the element with the CSS selector ".captcha-solver" to be available

    // Đợi iframe xuất hiên
    await page.waitForSelector('#captcha-recaptcha');
    // Truy cập vào iframe bằng cách sử dụng page.frame()
    const iframeHandle = await page.$('#captcha-recaptcha');
    const iframe = await iframeHandle.contentFrame();

    await iframe.waitForSelector('.captcha-solver');
    await iframe.click('.captcha-solver');
    try {
      await iframe.waitForSelector('.captcha-solver[data-state="solved"]', {
        timeout: 180000,
      });
    } catch (e) {
      throw new Error();
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await page.locator('.pam ._42ft').click();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await browser.close();
  }
}

async function stop() {
  for (let i = 0; i < browserArray.length; i++) {
    await browserArray[i].close();
  }
  browserArray = [];
}

module.exports = {
  submit,
  stop,
};
