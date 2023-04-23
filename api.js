const axios = require('axios');
const crypto = require('crypto');

const apiKey = process.env.API_KEY;
const apiSecret = process.env.SECRET_KEY;
const apiUrl = process.env.API_URL;

async function newOrder(symbol, quantity, side = "BUY") {
  const data = { symbol, side, quantity, type: "MARKET" };
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

module.exports = {
  newOrder
}