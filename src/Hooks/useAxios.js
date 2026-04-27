'use client'
import axios from "axios";

const instance = axios.create({
  baseURL:'https://do-chat-server.onrender.com',
  //http://localhost:5000
  //
});

export const useAxios = () => {
  return instance;
}
