require("dotenv").config();
const express = require("express");
const api = require('./api');
const app = express();
let symbol = "BTCUSDT";
let quantity = "0.01";
let leverage = 20;
let percentualCompra = 0.25;


app.use(express.json());

app.use('/trandingview-btcusdt-buy', async (req, res, next) => {

  let usdtBalance = api.getAccountInfo().then(data => {
    data.balances.filter(balance => {
      return balance.asset === "USDT"
    })
  })

  api.setLeverage(symbol, leverage)
    .then(() => {
      const lastPrice = api.getSymbolPrice(symbol)
        .then(() => {
          const usdtBalance = api.getAccountInfo()
            .then(data => {
              data.balances.filter(balance => {
                return balance.asset === "BTC"
              })
            })
          let valorParaCompra = usdtBalance * percentualCompra;
          let quantidadeBTC = valorParaCompra / lastPrice;

          api.newOrder(symbol, quantidadeBTC, "BUY")
            .then(order => {
              res.json(order);
            })
            .catch(err => {
              res.json(err);
            })
        })
    })
    .catch(err => {
      res.json(err);
    })
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