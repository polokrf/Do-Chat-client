'use client'
import React, { createContext, useContext, useState } from 'react';
const ChatContext = createContext();
export const ChatProvider = ({ children }) => {
  const [selectChat,setSelectChat]=useState('')
  const [liveChat,setLiveChat]=useState([])
  return (
    <ChatContext.Provider
      value={{ selectChat, setSelectChat, liveChat, setLiveChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
