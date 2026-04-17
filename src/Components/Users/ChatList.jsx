
import { useChat } from '@/Context/ChatProvider';
import { useAxios } from '@/Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

const ChatList = ({ setShowSidebar }) => {
  const axiosInstance = useAxios();
  const session = useSession();
  const { selectChat, setSelectChat } = useChat();
  const userId = session?.data?.user?.userId;
  const { data: chatList = [] } = useQuery({
    queryKey: ['chat-List', userId],
    enabled: !!userId,
    queryFn: async () => {
      const res = await axiosInstance.get(`/chats/chat-list?userId=${userId}`);
      return res.data;
    },
  });

  const handleChat = (id) => {

    setSelectChat(id)
    setShowSidebar(false);

  }

  return (
    <div className=" p-2 space-y-2">
      {chatList.map(chat => (
        <div
          onClick={() => handleChat(chat?._id)}
          key={chat._id}
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
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#4CAF50] border-2 border-[#415D9B] rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <p className="text-white font-semibold text-sm">{chat?.name}</p>
              <span className="text-[10px] text-white/40 font-light">
                {new Date(chat.lastSeen).toDateString()}
              </span>
            </div>
            <p className="text-xs text-white/70 truncate">
              {chat?.lastMessage}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;