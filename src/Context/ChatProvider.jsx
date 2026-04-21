'use client'
import socket from '@/lib/socket';
import React, { createContext, useContext, useEffect, useState } from 'react';
const ChatContext = createContext();
export const ChatProvider = ({ children }) => {
  const [selectChat,setSelectChat]=useState('')
  const [liveChat, setLiveChat] = useState([]);

  const [isOnline, setIsOnline] = useState({});

  useEffect(() => {
    socket.on('user-status', ({ userId, status }) => {
      setIsOnline(prev => ({
        ...prev,
        [userId]:status
      }))

      // console.log(userId,status)
    });

    return ()=>socket.off('user-status')
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
