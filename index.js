require("dotenv").config();
const express = require("express");
const api = require('./api');
const app = express();
let symbol = "BTCUSDT";
let quantity = "0.01";

app.use(express.json());

app.use('/', async (req, res, next) => {
  res.json('Bot Futures Binance')
})

app.use('/trandingview-buy', async (req, res, next) => {
  console.log(req.originalUrl);
  console.log(req.body);
  const order = await api.newOrder(symbol, quantity, "BUY")
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(err => {
      console.error(err)
    })
})

app.use('/trandingview-sell', async (req, res, next) => {
  console.log(req.originalUrl);
  console.log(req.body);
  const order = await api.newOrder(symbol, quantity, "SELL")
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(err => {
      console.error(err)
    })
})

app.listen(process.env.PORT, () => {
  console.log("Server started at " + process.env.PORT);
})