
import { useChat } from '@/Context/ChatProvider';
import { useAxios } from '@/Hooks/useAxios';
import socket from '@/lib/socket';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const ChatList = ({ setShowSidebar }) => {
  const axiosInstance = useAxios();
  const session = useSession();
  const { selectChat, setSelectChat, isOnline } = useChat();
  const {ref,inView}=useInView()
  const userId = session?.data?.user?.userId;
  const { data,fetchNextPage,hasNextPage,isFetchingNextPage} = useInfiniteQuery({
    queryKey: ['chat-List', userId],
    enabled: !!userId,
    queryFn: async ({pageParam = null}) => {
      const res = await axiosInstance.get(`/chats/chat-list?userId=${userId}&cursor=${pageParam || ''}`);
      return res.data;
    },
    getNextPageParam: lastPage => lastPage.nextCursor,
    initialPageParam:null
  });

   useEffect(() => {
      if (inView && hasNextPage) {
        fetchNextPage()
      }
    }, [inView, hasNextPage, fetchNextPage])

  const chatList = data?.pages?.flatMap(page => page?.usersChat) || [];
  
  



  const handleChat = (id) => {

    setSelectChat(id)
    setShowSidebar(false);

  }

  return (
    <div className=" p-2 space-y-2 overflow-y-auto">
      {chatList.map((chat, i) => (
        <div
          onClick={() => handleChat(chat?._id)}
          key={chat?._id || i}
          className="bg-white/10 px-6 py-4 flex items-center gap-3 cursor-pointer rounded-xl"
        >
          <div className="relative">
            <Image
              src={chat?.image || 'https://i.pravatar.cc/100?u=rahim'}
              className="w-11 h-11 rounded-full object-cover"
              alt={chat?.name || 'user'}
              height={50}
              width={50}
            />
            {isOnline[chat._id] === true && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#4CAF50] border-2 border-[#415D9B] rounded-full"></div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <p className="text-white font-semibold text-sm">{chat?.name}</p>
              <span className="text-[10px] text-white/40 font-light">
                {new Date(chat?.lastSeen).toDateString()}
              </span>
            </div>
            <p className="text-xs text-white/70 truncate">
              {chat?.lastMessage}
            </p>
          </div>
        </div>
      ))}

      <div ref={ref} className="h-14 flex items-center justify-center w-full">
        {isFetchingNextPage && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/20 border-t-white animate-spin rounded-full"></div>
            <span className="text-xs text-white/60">Loading more...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;