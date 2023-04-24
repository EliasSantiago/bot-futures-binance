require("dotenv").config();
const WebSocket = require('ws');
const express = require("express");
const api = require('./api');
const app = express();
let symbol = "BTCUSDT";
let symbolToLowerCase = symbol.toLowerCase(symbol);
let quantity = "0.01";
let leverage = 20;
let percentualCompra = 0.25;


app.use(express.json());

app.use('/trandingview-btcusdt-buy', async (req, res, next) => {
  const ws = new WebSocket(`${process.env.STREAM_URL}${symbolToLowerCase}usdt@markPrice@1s`);

  ws.onmessage = (event) => {
    const obj = JSON.parse(event.data);
    const price = parseFloat(obj.p);

    let usdtBalance = api.getAccountInfo().then(data => {
      data.balances.filter(balance => {
        return balance.asset === "USDT"
      })
    })

    let valorParaCompra = usdtBalance * percentualCompra;
    let quantidadeBTC = valorParaCompra / price;

    api.marginType(symbol, "CROSSED");

    api.setLeverage(symbol, leverage)
      .then(data => {
        const order = api.newOrder(symbol, quantidadeBTC, "BUY")
          .then(data => {
            res.json(data);
          })
          .catch(err => {
            res.json(err);
          })
      })
      .catch(err => {
        res.json(err);
      })
  }
})

app.use('/trandingview-btcusdt-sell', async (req, res, next) => {
  await api.setLeverage(symbol, leverage)
    .then(data => {
      const order = api.newOrder(symbol, quantity, "SELL")
        .then(data => {
          res.json(data);
        })
        .catch(err => {
          res.json(err);
        })
    })
    .catch(err => {
      res.json(err);
    })
})

app.use('/', async (req, res, next) => {
  res.json('Bot Futures Binance');
})

app.listen(process.env.PORT, () => {
  console.log("Server started at " + process.env.PORT);
})