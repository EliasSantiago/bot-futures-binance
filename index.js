require("dotenv").config();
const express = require("express");
const api = require('./api');
const app = express();

app.use(express.json());

app.use('/trandingview-btcusdt-buy', async (req, res, next) => {
  let symbol = "BTCUSDT";
  let quantity = "0.1";
  let leverage = 20;

  //await api.marginType(symbol, "CROSSED");

  await api.setLeverage(symbol, leverage)
    .then(data => {
      const order = api.newOrder(symbol, quantity, "BUY", "LONG")
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

app.use('/trandingview-btcusdt-sell', async (req, res, next) => {
  const symbol = "BTCUSDT";
  let quantity = "0.1";
  let leverage = 20;

  //await api.marginType(symbol, "CROSSED");

  await api.setLeverage(symbol, leverage)
    .then(data => {
      const order = api.newOrder(symbol, quantity, "SELL", "SHORT")
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

app.use('/trandingview-ethusdt-buy', async (req, res, next) => {
  let symbol = "ETHUSDT";
  let quantity = "0.1";
  let leverage = 20;

  //await api.marginType(symbol, "CROSSED");

  await api.setLeverage(symbol, leverage)
    .then(data => {
      const order = api.newOrder(symbol, quantity, "BUY", "LONG")
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

app.use('/trandingview-ethusdt-sell', async (req, res, next) => {
  const symbol = "ETHUSDT";
  let quantity = "0.1";
  let leverage = 20;

  //await api.marginType(symbol, "CROSSED");

  await api.setLeverage(symbol, leverage)
    .then(data => {
      const order = api.newOrder(symbol, quantity, "SELL", "SHORT")
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

app.use('/open-positions', async (req, res, next) => {
  const symbol = "BTCUSDT";
  const orders = await api.positionsBySymbol(symbol)
    .then(data => {
      res.json(data);
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