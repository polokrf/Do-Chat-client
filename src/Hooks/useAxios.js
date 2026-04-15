'use client'
import axios from "axios";

const instance = axios.create({
  baseURL: 'https://do-chat-server.onrender.com',
});

export const useAxios = () => {
  return instance;
}
