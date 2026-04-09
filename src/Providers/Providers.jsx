'use client'
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import {
 QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';


// Create a client
const queryClient = new QueryClient();

const Providers = ({ children }) => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>{children}</SessionProvider>
      </QueryClientProvider>
    </div>
  );
};

export default Providers;