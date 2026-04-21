'use client';
import React, { useEffect, useRef, useState } from 'react';
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
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
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
import socket from '@/lib/socket';
import MessageRequest from './Users/MessageRequest';
import { useInView } from 'react-intersection-observer';

const DashboardLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [search, setSearch] = useState('');
  const [tab,setTab]=useState('chats')
  const axiosInstance = useAxios();
  const { selectChat, setSelectChat,isOnline} = useChat();
  const router = useRouter()
  const session = useSession()
  const image=session?.data?.user?.image
  const name = session?.data?.user?.name
  const userId = session?.data?.user?.userId
  const megRef = useRef()
  const queryClient = useQueryClient();
  const {ref,inView}=useInView()
  

  useEffect(() => {
   
     if (!userId) return;
      socket.connect(); 
      socket.emit('join', userId);

    // console.log('connnect ',userId)
    
    return () => {
      socket.disconnect();
    }
    
  },[userId])

  // console.log('socket connected:', socket.connected);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage,isLoading } =
    useInfiniteQuery({
      queryKey: ['users', search],
      enabled: !!search,
      queryFn: async ({ pageParam = null }) => {
        const res = await axiosInstance.get(
          `/users?name=${search}&cursor=${pageParam || ''}`,
        );

        return res.data;
      },
      getNextPageParam: lastPage => lastPage.nextCursor,
      initialPageParam: null,
    });


  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])
  
  const users = data?.pages?.flatMap(page => page.users) || [];
  
  // get message request
  const { data: messageReq=[] } = useQuery({
    queryKey: ['messageReq', userId],
    enabled: !!userId,
    queryFn: async () => {
      const res = await axiosInstance.get(`/chats/message-request-list?userId=${userId}`);
      return res.data
    }
  })

 

  const handleRequestMeg = () => {
    megRef.current.showModal();
  }

  const handleMegAcDe = async (id,action) => {
    try {
      const update = {
        userId: userId,
        requestId: id,
        action
      }
      const res = await axiosInstance.patch('/chats/accept-delete', update);
      console.log(res)
      if (res?.data?.modifiedCount > 0 && action === 'accept') {
        setSelectChat(id);
      }
      megRef.current.close()
      queryClient.invalidateQueries(['messageReq']);
    } catch (error) {
      console.log(error)
    }
  }

  // Logout Handler (Placeholder)
  const handleLogout = () => {
    signOut();
    router.push('/')
  };

  const tabList = () => {
    if (tab === 'chats') {
      return <ChatList setShowSidebar={setShowSidebar} />;
    }
    if (tab === 'friends') {
      return <FriendsList setShowSidebar={setShowSidebar} />;
    }
    if (tab === 'requests') {
      return <RequestList setShowSidebar={setShowSidebar} />;
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
          {/* 1. Brand Header & Profile (Static - No Scroll) */}
          <div className="flex-none p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <span className="text-white text-xl font-bold tracking-tight">
                  DoChat
                </span>
              </div>
              <button
                onClick={() => setShowSidebar(false)}
                className="lg:hidden text-white/70"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <Image
                  src={image || '/default-user.png'}
                  alt={name || 'user'}
                  height={50}
                  width={50}
                  className="w-11 h-11 object-cover rounded-full border-2 border-white/20"
                />
                {isOnline[userId] === 'online' && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#4CAF50] border-2 border-[#3B5998] rounded-full"></div>
                )}
              </div>
              <div className="text-white">
                <p className="font-semibold text-sm">{name}</p>
                <p className="text-[10px] text-[#4CAF50] uppercase tracking-widest">
                  {isOnline[userId] === 'online' ? 'online' : 'offline'}
                </p>
              </div>
            </div>

            {/* Search Bar Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white/10 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/40 focus:outline-none focus:bg-white/20 transition-all"
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-white/40" />

              <div className=' text-right'>
                {users.length > 0 && (
                  <button
                    onClick={() => setSearch('')}
                    className="self-end p-2 mt-3 cursor-pointer mb-2 text-white/60 hover:text-white bg-white/5 rounded-lg transition-all"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 2. Scrollable Area (Users list OR Tabs) */}
          <div className="flex-1 w-full overflow-y-auto px-2 custom-scrollbar">
            {/* --- Search Results Mode --- */}
            {users.length > 0 ? (
              <div className="flex flex-col">
                <div className="space-y-1">
                  {users.map(user => (
                    <UsersCard
                      isLoading={isLoading}
                      key={user._id}
                      setShowSidebar={setShowSidebar}
                      user={user}
                    />
                  ))}
                </div>

                {/* The Infinite Scroll Ref  */}
                <div
                  ref={ref}
                  className="h-14 flex items-center justify-center w-full"
                >
                  {isFetchingNextPage && (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white animate-spin rounded-full"></div>
                      <span className="text-xs text-white/60">
                        Loading more...
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* --- Tabs Mode (Normal Sidebar) --- */
              <div className="flex flex-col h-full">
                <div className="flex space-x-6 text-sm font-medium text-white/60 mb-2 border-b border-white/10">
                  <button
                    onClick={() => setTab('chats')}
                    className={`pb-3 cursor-pointer ${tab === 'chats' && 'text-white border-b-2 border-white'}`}
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
                    className={`pb-3 cursor-pointer ${tab === 'requests' && 'text-white border-b-2 border-white'}`}
                  >
                    Requests
                  </button>
                </div>
                <div className="flex-1 py-4">{tabList()}</div>
              </div>
            )}
          </div>

          {/* 3. Footer (Logout & Notifications) */}
          <div className="flex-none p-4 border-t border-white/10 flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="flex-1 flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 group"
            >
              <LogOut className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
              <span className="text-sm font-medium">Logout</span>
            </button>

            <div className="relative group">
              <button
                onClick={handleRequestMeg}
                className="p-3 cursor-pointer text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center bg-red-500 text-[10px] font-bold text-white rounded-full ring-2 ring-[#3B5998]">
                  {messageReq.length}
                </span>
              </button>
              <MessageRequest
                messageReq={messageReq}
                megRef={megRef}
                handleMegAcDe={handleMegAcDe}
              />
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
