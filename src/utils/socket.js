// packages
import io from 'socket.io-client';

// env
import { SOCKET_ENDPOINT } from '@env';

const socket = io(SOCKET_ENDPOINT, {
  autoConnect: true,
  transports: ['websocket'] /* Needed for RN */,
  // reconnection: false /* Remove this while using while with server */,
  reconnection: true /* Un-comment this while using with server */,
  reconnectionDelay: 500,
  reconnectionAttempts: Infinity
  // jsonp: false,
  // agent: '-',
  // pfx: '-',
  // cert: '-',
  // ca: '-',
  // ciphers: '-',
  // rejectUnauthorized: '-',
  // perMessageDeflate: '-'
});

console.log('connected:', socket.connected);

socket.open();

socket.on('connect', data => {
  console.log('socket on connect:', data, socket.connected);
});

export default socket;
