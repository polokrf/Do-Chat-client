import { io } from 'socket.io-client';

const socket = io('https://do-chat-server.onrender.com', {
  autoConnect: false,
}); 

export default socket;
