import { io } from 'socket.io-client';

const socket = io('https://do-chat-server.onrender.com', {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
// http://localhost:5000
// 
export default socket;
