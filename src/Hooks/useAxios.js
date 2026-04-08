'use client'
import axios from "axios";

const instance = axios.create({
  baseURL:'http://localhost:5000',
});

export const useAxios = () => {
  return instance;
}
