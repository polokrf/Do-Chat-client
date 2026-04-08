
import RegisterForm from '@/Components/AuthLoginReg/RegisterForm';
import React from 'react';

const Register = () => {
  
  return (
    <div className="relative min-h-screen font-sans antialiased overflow-hidden">
      {/* Overlay: Register Card (Upore thakbe) */}
      <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm overflow-y-auto">
        {/* Main Card */}
        <div className="bg-white w-full max-w-[950px] min-h-screen md:min-h-[600px] md:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/20 my-auto">
          {/* Left Side: Brand/Welcome Section */}
          <div className="w-full md:w-[40%] bg-[#3B5998] p-8 md:p-12 text-white flex flex-col justify-center relative overflow-hidden shrink-0">
            <div className="absolute -top-10 -left-10 w-32 h-32 md:w-40 md:h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 md:w-40 md:h-40 bg-black/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 text-center md:text-left">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl rotate-12 mb-6 mx-auto md:mx-0 flex items-center justify-center shadow-xl">
                <span className="text-[#3B5998] text-2xl md:text-3xl font-black -rotate-12">
                  do
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3 leading-tight">
                Create Your <br className="hidden md:block" /> Account
              </h1>
              <p className="text-white/70 text-base md:text-lg">
                Join thousands of users and experience the fastest way to chat.
              </p>
            </div>

            {/* Avatars - Hidden on Mobile */}
            <div className="relative z-10 hidden md:block mt-8">
              <div className="flex -space-x-3 mb-4">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-[#3B5998] bg-slate-200 animate-pulse"
                  ></div>
                ))}
              </div>
              <p className="text-sm text-white/60 italic">
                Join our community today
              </p>
            </div>
          </div>

          {/* Right Side: Form Section */}
          <div className="w-full md:w-[60%] bg-white p-6 sm:p-8 md:p-12">
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                Get Started
              </h2>
              <p className="text-slate-500 mt-1">
                Setup your profile in seconds
              </p>
            </div>

          <RegisterForm></RegisterForm>
          </div>
        </div>
      </div>

      {/* Background: Skeleton Dashboard (Pichone thakbe) */}
      <div className="flex h-screen bg-[#f0f2f5] filter blur-[4px] select-none pointer-events-none">
        {/* Sidebar Skeleton */}
        <aside className="w-80 bg-white border-r border-slate-200 hidden lg:flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-200 rounded-xl animate-pulse"></div>
            <div className="w-32 h-6 bg-slate-200 rounded-md animate-pulse"></div>
          </div>
          <div className="p-4 space-y-6">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-200 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="w-20 h-3 bg-slate-200 rounded animate-pulse"></div>
                  <div className="w-full h-2 bg-slate-100 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Chat Area Skeleton */}
        <div className="flex-1 flex flex-col">
          <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-200 rounded-full animate-pulse"></div>
              <div className="w-40 h-4 bg-slate-200 rounded animate-pulse"></div>
            </div>
          </header>
          <div className="flex-1 p-10 space-y-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
              <div className="w-64 h-20 bg-slate-100 rounded-2xl"></div>
            </div>
            <div className="flex gap-4 justify-end">
              <div className="w-64 h-16 bg-[#3B5998]/10 rounded-2xl"></div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
              <div className="w-80 h-24 bg-slate-100 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
