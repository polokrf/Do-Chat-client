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
  LogOut,
  MessageCircle,
  XCircle, // Added LogOut icon
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useAxios } from '@/Hooks/useAxios';
import UsersCard from './Users/UsersCard';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ChatList from './Users/ChatList';
import FriendsList from './Users/FriendsList';
import RequestList from './Users/RequestList';
import { useChat } from '@/Context/ChatProvider';
import ChatBox from './Users/ChatBox';

const DashboardLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [search, setSearch] = useState('');
  const [tab,setTab]=useState('chats')
  const axiosInstance = useAxios();
  const { selectChat, setSelectChat } = useChat();
  const router = useRouter()
  const session = useSession()
  const image=session?.data?.user?.image
  const name=session?.data?.user?.name

  const { data: users = [] ,isLoading} = useQuery({
    queryKey: ['users', search],
    enabled: !!search,
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?name=${search}`);
      return res.data;
    },
  });

  // Logout Handler (Placeholder)
  const handleLogout = () => {
    signOut();
    router.push('/')
  };

  const tabList = () => {
    if (tab === 'chats') {
      return <ChatList/>
    }
    if (tab === 'friends') {
      return <FriendsList/>
    }
    if (tab === 'requests') {
      return <RequestList/>
    }
  }
  
  
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
                DoChat
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
                <Image
                  src={image || '/default-user.png'}
                  alt={name || 'user'}
                  height={22}
                  width={22}
                  className="w-11 h-11 object-cover object-top rounded-full border-2 border-white/20"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#4CAF50] border-2 border-[#3B5998] rounded-full"></div>
              </div>
              <div className="text-white">
                <p className="font-semibold text-sm">{name}</p>
                <div className="flex items-center gap-1">
                  <p className="text-[10px]  text-[#4CAF50]  uppercase tracking-widest">
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
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white/10 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/40 focus:outline-none focus:bg-white/20 transition-all"
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-white/40" />
            </div>
            {/* user show */}
            <div
              className={`${users.length === 0 || 'overflow-y-auto overflow-x-auto'}`}
            >
              <button
                onClick={() => setSearch('')}
                className={`${users.length > 0 ? 'block' :'hidden'} p-2 mt-1 text-white/60 hover:text-white cursor-pointer hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center justify-center`}
              >
                <XCircle className="w-5 h-5" />
              </button>
              {users.map(user => (
                <UsersCard
                  isLoading={isLoading}
                  key={user._id}
                  user={user}
                ></UsersCard>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div
            className={`${users.length >= 1 ? 'hidden' : 'block'} flex px-6 space-x-6 text-sm font-medium text-white/60 mb-2 border-b border-white/10`}
          >
            <button
              onClick={() => setTab('chats')}
              className={`pb-3  cursor-pointer ${tab === 'chats' && 'text-white border-b-2 border-white'}`}
            >
              Chats
            </button>
            <button
              onClick={() => setTab('friends')}
              className={`pb-3 cursor-pointer ${tab === 'friends' && 'text-white border-b-2 border-white'}`}
            >
              Friends
            </button>
            <button
              onClick={() => setTab('requests')}
              className={`pb-3  cursor-pointer ${tab === 'requests' && 'text-white border-b-2 border-white'}`}
            >
              Requests
            </button>
          </div>

          {/* Active  tab menu */}
          <div
            className={`flex-1 overflow-y-auto ${users.length >= 1 && 'hidden'}`}
          >
            {tabList()}
          </div>

          {/* message and logout btn */}
          <div className="p-4 mt-auto border-t border-white/10 flex items-center gap-2">
            {/* Logout Button: Expanded to take available space */}
            <button
              onClick={handleLogout}
              className="flex-1 flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 group"
            >
              <LogOut className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
              <span className="text-sm font-medium">Logout</span>
            </button>

            {/* Message Notification: Icon Style */}
            <div className="relative group">
              <button className="p-3 cursor-pointer text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300">
                <MessageCircle className="w-5 h-5" />
                {/* The Badge */}
                <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center bg-red-500 text-[10px] font-bold text-white rounded-full ring-2 ring-[#121212]">
                  3
                </span>
              </button>
            </div>
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

        <ChatBox setShowSidebar={setShowSidebar} />
      </div>
    </div>
  );
};

export default DashboardLayout;
