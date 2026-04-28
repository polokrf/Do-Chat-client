'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6 relative overflow-hidden">
      <div className="max-w-md w-full text-center relative z-10">
        {/* Animated Icon Container */}
        <div className="mb-8 flex justify-center">
          <div className="bg-blue-50 p-10 rounded-full animate-bounce shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-[#3b5998]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Big Background Text */}
        <h1 className="text-[12rem] font-black text-gray-50 absolute inset-0 flex items-center justify-center -z-10 select-none">
          404
        </h1>

        <div className="relative">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Something went wrong!
          </h2>
          <p className="text-gray-500 text-lg max-w-xs mx-auto leading-relaxed mb-10">
            The link you are looking for could not be found. Please check if the
            URL is correct.
          </p>

          
        </div>

        {/* Decorative Bottom Bar */}
        <div className="mt-12 flex justify-center space-x-2">
          <div className="h-1.5 w-12 bg-[#3b5998] rounded-full opacity-10"></div>
          <div className="h-1.5 w-4 bg-[#3b5998] rounded-full opacity-20"></div>
          <div className="h-1.5 w-1.5 bg-[#3b5998] rounded-full opacity-40"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
