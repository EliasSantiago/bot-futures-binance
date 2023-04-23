require('dotenv').config();
const WebSocket = require('ws');
let symbol = "ADAUSDT";
let quantity = "0.1000";
let symbolToLowerCase = symbol.toLowerCase(symbol);

console.log(symbolToLowerCase);

const ws = new WebSocket(`${process.env.STREAM_URL}${symbolToLowerCase}usdt@markPrice@1s`);
console.log(ws);

const api = require('./api');
let isOpened = false;

ws.onmessage = (event) => {
  const obj = JSON.parse(event.data);
  console.log(`Simbol: ${obj.s}`);
  console.log(`Mark Price: ${obj.p}`);
  const price = parseFloat(obj.p);

  if (price > 0.3980 && !isOpened) {
    console.log("Abrir posição");
    isOpened = true;
    api.newOrder(symbol, quantity, "SELL")
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.error(err)
        isOpened = false;
      })
  } else if (price > 0.3970 && isOpened) {
    console.log("Fechar posição");
    isOpened = false;
    api.newOrder(symbol, quantity, "BUY")
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.error(err)
      isOpened = false;
    })
  } else {
    console.log("Aguardando...")
  }
}