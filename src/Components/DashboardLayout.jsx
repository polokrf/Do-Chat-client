'use client';
import React, { useState } from 'react';
// React Icons (Lucide) import kora hoyeche
import {
  MessageSquare,
  X,
  Search,
  Phone,
  Video,
  Smile,
  Paperclip,
  Menu,
  Send,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useAxios } from '@/Hooks/useAxios';
import UsersCard from './Users/UsersCard';

const DashboardLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [search, setSearch] = useState('');
  const axiosInstance = useAxios();
  
  const { data: users =[]} = useQuery({
    queryKey: ['users', search],
    enabled: !!search,
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?name=${search}`)
      return res.data
    }
  })

  console.log(users);
  return (
    <div className="flex h-screen w-full bg-[#F3F4F6] md:p-6 lg:p-10 font-sans overflow-hidden">
      {/* Main Container */}
      <div className="flex w-full max-w-7xl mx-auto bg-white md:rounded-[32px] overflow-hidden shadow-2xl relative">
        {/* Sidebar */}
        <aside
          className={`
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:static absolute inset-y-0 left-0 z-50 
          w-80 sm:w-80 bg-[#3B5998] flex flex-col transition-transform duration-300 ease-in-out
        `}
        >
          {/* Brand Header */}
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-white text-xl font-bold tracking-tight">
                ChatConnect
              </span>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={() => setShowSidebar(false)}
              className="lg:hidden text-white/70 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* User Profile */}
          <div className="px-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/100?u=polok"
                  alt="Polok"
                  className="w-11 h-11 rounded-full border-2 border-white/20"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#4CAF50] border-2 border-[#3B5998] rounded-full"></div>
              </div>
              <div className="text-white">
                <p className="font-semibold text-sm">Polok Ahmed</p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-[#4CAF50] rounded-full"></div>
                  <p className="text-[10px] text-white/70 uppercase tracking-widest">
                    Online
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-6 mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e)=> setSearch(e.target.value)}
                className="w-full bg-white/10 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/40 focus:outline-none focus:bg-white/20 transition-all"
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-white/40" />
            </div>
            {/* user show */}
            <div>
            {users.map(user => <UsersCard key={user._id} user={user}></UsersCard>)}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex px-6 space-x-6 text-sm font-medium text-white/60 mb-2 border-b border-white/10">
            <button className="pb-3 text-white border-b-2 border-white">
              Chats
            </button>
            <button className="pb-3">Friends</button>
            <button className="pb-3">Requests</button>
          </div>

          {/* Active Chat List */}
          <div className="flex-1 overflow-y-auto">
            <div className="bg-white/10 px-6 py-4 flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/100?u=rahim"
                  className="w-11 h-11 rounded-full"
                  alt="Rahim"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#4CAF50] border-2 border-[#415D9B] rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="text-white font-semibold text-sm">Rahim</p>
                  <span className="text-[10px] text-white/40 font-light">
                    5:25 PM
                  </span>
                </div>
                <p className="text-xs text-white/70 truncate">
                  Hey, what's up?
                </p>
              </div>
            </div>
          </div>

          {/* Message Requests Notification */}
          <div className="p-6 mt-auto border-t border-white/10 flex justify-between items-center text-white">
            <span className="font-medium text-sm">Message Requests</span>
            <span className="bg-[#E74C3C] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
              3
            </span>
          </div>
        </aside>

        {/* Sidebar Overlay */}
        {showSidebar && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setShowSidebar(false)}
          ></div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-white">
          {/* Header */}
          <header className="h-16 md:h-20 border-b flex items-center justify-between px-4 md:px-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSidebar(true)}
                className="lg:hidden p-2 text-gray-400 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/100?u=rahim"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                  alt="Rahim"
                />
                <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-[#4CAF50] border-2 border-white rounded-full"></div>
              </div>
              <div>
                <p className="text-[#333333] font-bold text-base md:text-lg leading-tight">
                  Rahim
                </p>
                <p className="text-[10px] text-[#4CAF50] font-bold tracking-widest uppercase">
                  Online
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="p-2.5 bg-[#F0F2F5] rounded-full text-gray-600 hover:bg-gray-200 transition-all">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2.5 bg-[#F0F2F5] rounded-full text-gray-600 hover:bg-gray-200 transition-all">
                <Video className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scrollbar-hide">
            <div className="flex justify-end gap-2 group">
              <div className="bg-[#F1F3F4] text-[#333333] px-5 py-2.5 rounded-2xl rounded-br-none max-w-[85%] md:max-w-[60%] shadow-sm">
                <p className="text-sm">Hey, what's up?</p>
              </div>
              <span className="text-[10px] text-gray-400 self-end">
                5:25 PM
              </span>
            </div>

            <div className="flex justify-start gap-3">
              <img
                src="https://i.pravatar.cc/100?u=rahim"
                className="w-8 h-8 rounded-full self-end"
                alt="Rahim"
              />
              <div className="bg-[#F1F1F1] text-black px-5 py-2.5 rounded-2xl rounded-tl-none max-w-[85%] md:max-w-[60%] shadow-sm">
                <p className="text-sm">Hi bro! All good, you?</p>
              </div>
            </div>
          </div>

          {/* Footer Input */}
          <footer className="p-4 md:p-6 bg-white border-t border-gray-50">
            <div className="flex items-center gap-3 bg-[#F8F9FA] border border-gray-200 rounded-full px-4 md:px-6 py-1.5 md:py-2">
              <Smile className="w-6 h-6 text-gray-500 cursor-pointer hover:scale-110 transition-transform" />
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-transparent py-2 px-1 text-sm focus:outline-none"
              />
              <div className="flex items-center gap-3 text-gray-400 border-r pr-3">
                <Paperclip className="w-5 h-5 cursor-pointer hover:text-gray-600 transition-colors" />
              </div>
              <button className="bg-[#2A7BFF] text-white px-6 md:px-10 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-blue-100 hover:opacity-90 hover:shadow-blue-200 transition-all flex items-center gap-2">
                Send
                <Send className="w-4 h-4" />
              </button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
