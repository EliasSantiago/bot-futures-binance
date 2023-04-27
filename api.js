const axios = require('axios');
const crypto = require('crypto');

const apiKey = process.env.API_KEY;
const apiSecret = process.env.SECRET_KEY;
const apiUrl = process.env.API_URL;

async function openPosition(symbol, quantity, side, type) {
  const data = { symbol, quantity, side, type };
  const timestamp = Date.now();
  const recvWindows = 60000;
  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(`${new URLSearchParams({...data, timestamp, recvWindows}).toString()}`)
    .digest('hex');
  const newData = { ...data, timestamp, recvWindows, signature };
  const qs = `?${new URLSearchParams(newData).toString()}`;

  const result = await axios({
    method: 'POST',
    url: `${apiUrl}v1/order${qs}`,
    headers: { 'X-MBX-APIKEY': apiKey }
  });

  return result.data;
}

async function positionsBySymbol(symbol) {
  symbol = symbol.toLowerCase();
  const data = { symbol };
  const timestamp = Date.now();
  const recvWindows = 60000;
  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(`${new URLSearchParams({...data, timestamp, recvWindows}).toString()}`)
    .digest('hex');
  const newData = { ...data, timestamp, recvWindows, signature };
  const qs = `?${new URLSearchParams(newData).toString()}`;

  const result = await axios({
    method: 'GET',
    url: `${apiUrl}v1/positionRisk${qs}`,
    headers: { 'X-MBX-APIKEY': apiKey }
  });

  return result.data;
}

async function openOrders(symbol) {
  const data = { symbol };
  const timestamp = Date.now();
  const recvWindows = 60000;
  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(`${new URLSearchParams({...data, timestamp, recvWindows}).toString()}`)
    .digest('hex');
  const newData = { ...data, timestamp, recvWindows, signature };
  const qs = `?${new URLSearchParams(newData).toString()}`;

  const result = await axios({
    method: 'GET',
    url: `${apiUrl}v1/openOrder${qs}`,
    headers: { 'X-MBX-APIKEY': apiKey }
  });

  return result.data;
}

async function setLeverage(symbol, leverage) {
  const data = { symbol, leverage };
  const timestamp = Date.now();
  const recvWindows = 60000;
  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(`${new URLSearchParams({...data, timestamp, recvWindows}).toString()}`)
    .digest('hex');
  const newData = { ...data, timestamp, recvWindows, signature };
  const qs = `?${new URLSearchParams(newData).toString()}`;

  const result = await axios({
    method: 'POST',
    url: `${apiUrl}v1/leverage${qs}`,
    headers: { 'X-MBX-APIKEY': apiKey }
  });

  return result.data;
}

async function marginType(symbol, marginType) {
  symbol = symbol.toLowerCase();
  const data = { symbol, marginType };
  const timestamp = Date.now();
  const recvWindows = 60000;
  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(`${new URLSearchParams({...data, timestamp, recvWindows}).toString()}`)
    .digest('hex');
  const newData = { ...data, timestamp, recvWindows, signature };
  const qs = `?${new URLSearchParams(newData).toString()}`;

  const result = await axios({
    method: 'POST',
    url: `${apiUrl}v1/marginType${qs}`,
    headers: { 'X-MBX-APIKEY': apiKey }
  });

  return result.data;
}

async function getAccountInfo() {
  const timestamp = Date.now();
  const recvWindows = 60000;
  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(`${new URLSearchParams({...data, timestamp, recvWindows}).toString()}`)
    .digest('hex');
  const newData = { ...data, timestamp, recvWindows, signature };
  const qs = `?${new URLSearchParams(newData).toString()}`;

  const result = await axios({
    method: 'GET',
    url: `${apiUrl}v1/account${qs}`,
    headers: { 'X-MBX-APIKEY': apiKey }
  });

  return result.data;
}

async function getSymbolPrice(symbol) {
  const timestamp = Date.now();
  const recvWindows = 60000;
  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(`${new URLSearchParams({timestamp, recvWindows}).toString()}`)
    .digest('hex');
  const qs = `?${new URLSearchParams({timestamp, recvWindows, signature}).toString()}`;

  const result = await axios({
    method: 'GET',
    url: `${apiUrl}v1/ticker/24hr?symbol=${symbol}`,
    headers: { 'X-MBX-APIKEY': apiKey }
  });

  return result.data;
}

module.exports = {
  openPosition,
  setLeverage,
  marginType,
  getAccountInfo,
  getSymbolPrice,
  openOrders,
  positionsBySymbol
}