require("dotenv").config();
const express = require("express");
const api = require('./api');
const app = express();

app.use(express.json());

app.use('/trandingview-btcusdt-buy', async (req, res, next) => {
  let symbol = "BTCUSDT";
  let qty = "0.1";
  let leverage = 20;

  await api.setLeverage(symbol, leverage)
  const orderExists = await api.positionsBySymbol(symbol)

  if (orderExists.length == 0 || (orderExists.length > 0 && orderExists[0].positionAmt < 0)) {
    const currentPosition = orderExists[0];
    const qty = currentPosition.positionAmt;
    const closePosition = await api.openPosition(symbol, qty, "SELL", "MARKET")
      .then(data => {
        const openPosition = api.openPosition(symbol, qty, "BUY", "MARKET")
          .then(data => {
            res.json(data);
          })
      })
  } else if (orderExists.length > 0 && orderExists[0].positionAmt == 0) {
    const openPosition = await api.openPosition(symbol, qty, "BUY", "MARKET")
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      })
  } else {
    res.json(orderExists[0]);
  }
})

app.use('/trandingview-btcusdt-sell', async (req, res, next) => {
  let symbol = "BTCUSDT";
  let qty = "0.1";
  let leverage = 50;

  await api.setLeverage(symbol, leverage)
  const orderExists = await api.positionsBySymbol(symbol)

  if (orderExists.length == 0 || (orderExists.length > 0 && orderExists[0].positionAmt > 0)) {
    const currentPosition = orderExists[0];
    const qty = currentPosition.positionAmt;
    const closePosition = await api.openPosition(symbol, qty, "SELL", "MARKET")
      .then(data => {
        const openPosition = api.openPosition(symbol, qty, "SELL", "MARKET")
          .then(data => {
            res.json(data);
          })
      })
  } else if (orderExists.length > 0 && orderExists[0].positionAmt == 0) {
    const openPosition = await api.openPosition(symbol, qty, "SELL", "MARKET")
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      })
  } else {
    res.json(orderExists[0]);
  }
})

app.use('/trandingview-ethusdt-buy', async (req, res, next) => {
  let symbol = "ETHUSDT";
  let qty = "0.1";
  let leverage = 20;

  await api.setLeverage(symbol, leverage)
  const orderExists = await api.positionsBySymbol(symbol)

  if (orderExists.length == 0 || (orderExists.length > 0 && orderExists[0].positionAmt < 0)) {
    const currentPosition = orderExists[0];
    const qty = currentPosition.positionAmt;
    const closePosition = await api.openPosition(symbol, qty, "SELL", "MARKET")
      .then(data => {
        const openPosition = api.openPosition(symbol, qty, "BUY", "MARKET")
          .then(data => {
            res.json(data);
          })
      })
  } else if (orderExists.length > 0 && orderExists[0].positionAmt == 0) {
    const openPosition = await api.openPosition(symbol, qty, "BUY", "MARKET")
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      })
  } else {
    res.json(orderExists[0]);
  }
})

app.use('/trandingview-ethusdt-sell', async (req, res, next) => {
  const symbol = "ETHUSDT";
  let qty = "0.1";
  let leverage = 20;

  await api.setLeverage(symbol, leverage)
  const orderExists = await api.positionsBySymbol(symbol)

  if (orderExists.length == 0 || (orderExists.length > 0 && orderExists[0].positionAmt > 0)) {
    const currentPosition = orderExists[0];
    const qty = currentPosition.positionAmt;
    const closePosition = await api.openPosition(symbol, qty, "SELL", "MARKET")
      .then(data => {
        const openPosition = api.openPosition(symbol, qty, "SELL", "MARKET")
          .then(data => {
            res.json(data);
          })
      })
  } else if (orderExists.length > 0 && orderExists[0].positionAmt == 0) {
    const openPosition = await api.openPosition(symbol, qty, "SELL", "MARKET")
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      })
  } else {
    res.json(orderExists[0]);
  }
})

app.use('/open-positions-btc', async (req, res, next) => {
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
  res.json('Ignitor - Bot Futures Binance');
})

app.listen(process.env.PORT, () => {
  console.log("Server started at " + process.env.PORT);
})