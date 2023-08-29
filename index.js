// server.js
const express = require('express');
const { submit } = require('./puppeFunction.js');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const date = require('./date.js');
// let apiKey = '1352d7383cbf4dc3921c1ecf60f56605';
let apiKey;

// Đặt cấu hình cho CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.post('/run-puppeteer', async (req, res) => {
  const position = req.body.position;
  try {
    const data = req.body.data;
    // console.log(data);
    const signature = req.body.signature;
    // apiKey = data.apiKey;
    try {
      await submit(position.x, position.y, signature, data);
    } catch (e) {
      res.send({
        message: `==> ${date()} Cửa sổ thứ ${
          position.index
        } không vượt được Captcha !!!\n`,
      });
      return;
    }
    res.send({
      message: `==> ${date()} Cửa sổ thứ ${position.index} hoàn thành.\n`,
    });
  } catch (e) {
    res.send({
      message: `==> ${date()} Cửa sổ thứ ${
        position.index
      } không hoàn thành !!!\n`,
    });
  }
});
module.exports = { app };
