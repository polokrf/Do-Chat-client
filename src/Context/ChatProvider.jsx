'use client'
import socket from '@/lib/socket';
import React, { createContext, useContext, useEffect, useState } from 'react';
const ChatContext = createContext();
export const ChatProvider = ({ children }) => {
  const [selectChat,setSelectChat]=useState('')
  const [liveChat, setLiveChat] = useState([]);

  const [isOnline, setIsOnline] = useState({});

  useEffect(() => {
    socket.on('all-users', userIds => {
      const map = {};
       userIds.forEach(id => {
         map[id] = true;
       });
       setIsOnline(map);
     });
    
    socket.on('user-status', ({ userId, status }) => {
      setIsOnline(prev => {
        const updated = { ...prev };

        if (status === 'online') {
          updated[userId] = true;
        } else {
          delete updated[userId];
        }

        return updated;
      });
    });


    return () => {
      socket.off('user-status')
      socket.off('all-users')
    }
  },[])

  return (
    <ChatContext.Provider
      value={{ selectChat, setSelectChat, liveChat, setLiveChat,isOnline }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
