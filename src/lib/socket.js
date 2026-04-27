import { io } from 'socket.io-client';

const socket = io('https://do-chat-server.onrender.com', {
  autoConnect: false,
});
// http://localhost:5000
// 
export default socket;
