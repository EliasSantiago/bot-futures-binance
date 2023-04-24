require("dotenv").config();
const express = require("express");
const api = require('./api');
const app = express();
let symbol = "BTCUSDT";
let quantity = "0.01";

app.use(express.json());

app.use('/trandingview-btcusdt-buy', async (req, res, next) => {
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
})

app.use('/', async (req, res, next) => {
  console.log('Bot Futures Binance');
  console.log(process.env.PORT);
  console.log(process.env.API_KEY);
  console.log(process.env.SECRET_KEY);
  res.json('Bot Futures Binance')
})

app.listen(process.env.PORT, () => {
  console.log("Server started at " + process.env.PORT);
})