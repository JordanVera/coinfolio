import openSocket from 'socket.io-client';
import { API_URL_COINCAP } from '../constans';

const socket = openSocket(API_URL_COINCAP);

function subscribeToTrades(tradeMsg) {
  socket.on('trades', tradeMsg)
}

export { subscribeToTrades };
