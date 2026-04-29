'use client'
import { useEffect } from 'react';
import axios from "axios";
import { signOut, useSession } from "next-auth/react";



const instance = axios.create({
  baseURL:'https://do-chat-server.onrender.com',
  //http://localhost:5000
  //
});

export const useAxios = () => {
  const { data: session, status } = useSession();

   useEffect(() => {
     
    if (status !== 'authenticated') return;

     const requestInterceptor = instance.interceptors.request.use(config => {
       const token = session?.accessToken;
       if (token) {
         config.headers.Authorization = `Bearer ${token}`;
       }

       return config;
     });
     const responseInterceptor = instance.interceptors.response.use(res => {
       return res
     },async( error) => {
        let responseStatus= error?.response?.status;
        if (responseStatus === 401 || responseStatus === 403) {
                 await signOut({
                   callbackUrl: '/',
                 });
                   
                    
                }
       return Promise.reject(error);
     })

     return () => {
       instance.interceptors.request.eject(requestInterceptor);
       instance.interceptors.request.eject(responseInterceptor);
     };
   }, [session, status]);

  return instance;
}
