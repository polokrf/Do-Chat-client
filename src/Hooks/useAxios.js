'use client'
import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  //
  //https://do-chat-server.onrender.com
});

export const useAxios = () => {
  return instance;
}
