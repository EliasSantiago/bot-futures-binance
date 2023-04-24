require("dotenv").config();
const express = require("express");
const api = require('./api');
const app = express();
let symbol = "BTCUSDT";
let quantity = "0.01";
let leverage = 20;

app.use(express.json());

app.use('/trandingview-btcusdt-buy', async (req, res, next) => {
  const setLeverage = await api.setLeverage(symbol, leverage)
    .then(data => {
      const order = api.newOrder(symbol, quantity, "BUY")
        .then(data => {
          res.json(order);
        })
        .catch(err => {
          return err
        })
    })
    .catch(err => {
      res.json(err);
    })
})

app.use('/trandingview-btcusdt-sell', async (req, res, next) => {
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
  res.json(order);
})

app.use('/', async (req, res, next) => {
  res.json('Bot Futures Binance');
})

app.listen(process.env.PORT, () => {
  console.log("Server started at " + process.env.PORT);
})