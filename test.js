async function runPuppeteer(data, position, signature, callback) {
  try {
    const response = await fetch('http://localhost:3001/tool-2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, position, signature }),
    });

    const dataReceive = await response.json();

    if (response.status >= 200 && response.status < 300) {
      callback(dataReceive.message);
    } else {
      callback('Failed to send data.');
    }
  } catch (error) {
    callback(`Error: ${error}`);
  }
}

let countryName,
  arraySignature,
  selectName,
  selectInnerNameText,
  selectInnerName;
const name = document.querySelector('.name__input');
const addressSent = document.querySelector('.address-sent-letter__input');
const addressMail = document.querySelector('.address-mail__input');
const nameOwn = document.querySelector('.name-own__input');
const showUrl = document.querySelector('.show-url__input');
// const branch = document.querySelector('.branch__input');
const country = document.querySelector('.country__select');
// const trademarkRegister = document.querySelector('.trademark-register__input');
const provideUrl = document.querySelector('.provide-url__input');
const provideInfo = document.querySelector('.provide-infor__input');
const electronicSignature = document.querySelector(
  '.electronic_signature__input'
);
const result = document.querySelector('.result');
const clear = document.querySelector('.clear');
const start = document.querySelector('.start');
const stop = document.querySelector('.stop');
const select = document.querySelector('.select__link');
// const apiKey = document.querySelector('.api_key');
let isRunning = true;

selectName = select.options[0].value;
selectInnerNameText = select.options[0].innerText;

country.addEventListener('change', () => {
  const index = country.selectedIndex;
  countryName = country.options[index].innerText;
});

select.addEventListener('change', () => {
  const index = select.selectedIndex;
  selectName = select.options[index].value;
  selectInnerNameText = select.options[index].innerText;
});

start.addEventListener('click', async () => {
  isRunning = true;
  arraySignature = electronicSignature.value.split('|');

  if (arraySignature.length !== 0) {
    start.classList.add('disabled');
    start.disabled = true;
    result.value += '==> Bắt đầu spam !!!\n';
    if (selectInnerNameText === 'Bản quyền Facebook') {
      result.value += '==> Link Bản quyền Facebook :\n';
      selectInnerName = '1';
    } else if (selectInnerNameText === 'Bản Quyền Instagram') {
      result.value += '==> Link Bản Quyền Instagram :\n';
      selectInnerName = '2';
    }
    data = {
      // apiKey: apiKey.value,
      selectInnerName,
      selectName,
      name: name.value,
      addressSent: addressSent.value,
      addressMail: addressMail.value,
      nameOwn: nameOwn.value,
      showUrl: showUrl.value,
      // branch: branch.value,
      countryName,
      // trademarkRegister: trademarkRegister.value,
      provideUrl: provideUrl.value,
      provideInfo: provideInfo.value,
    };

    const PositionWindow = [
      { index: 1, x: 0, y: 0 },
      { index: 2, x: 500, y: 0 },
      { index: 3, x: 1000, y: 0 },
      { index: 4, x: 1500, y: 0 },
      { index: 5, x: 0, y: 515 },
      { index: 6, x: 500, y: 515 },
      { index: 7, x: 1000, y: 515 },
      { index: 8, x: 1500, y: 515 },
      { index: 9, x: 0, y: 0 },
      { index: 10, x: 500, y: 0 },
    ];

    const promise = [];

    for (let i = 0; i < arraySignature.length; i++) {
      promise.push(
        runPuppeteer(data, PositionWindow[i], arraySignature[i], (message) => {
          result.value += message;
        })
      );
    }
    await Promise.all(promise);
    if (!isRunning) {
      result.value = '';
      // return;
    }
    start.classList.remove('disabled');
    start.disabled = false;
  }
});

clear.addEventListener('click', () => {
  start.classList.remove('disabled');
  start.disabled = false;

  const inputElements = document.querySelectorAll('input[type="text"]');

  inputElements.forEach(function (input) {
    input.value = '';
  });

  const textareaElements = document.querySelectorAll('textarea');

  textareaElements.forEach(function (textarea) {
    textarea.value = '';
  });

  country.selectedIndex = 0;

  const index = select.selectedIndex;
  selectName = select.options[index].value;
  selectInnerNameText = select.options[index].innerText;
});

stop.addEventListener('click', () => {
  fetch('http://localhost:3001/tool-2-close', { method: 'GET' })
    .then((response) => response.text())
    .then((data) => {
      result.value = ''; // Hiển thị thông báo từ máy chủ
    })
    .catch((error) => {
      console.error('Lỗi:', error);
    });
  isRunning = false;

  start.classList.remove('disabled');
  start.disabled = false;
});
