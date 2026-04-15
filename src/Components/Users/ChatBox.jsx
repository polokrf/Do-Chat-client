import React, { useEffect } from 'react';
import {
  Menu,
  Paperclip,
  Phone,
  Send,
  Smile,
  Video,
  MoreVertical,
} from 'lucide-react';
import { useChat } from '@/Context/ChatProvider';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useAxios } from '@/Hooks/useAxios';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import socket from '@/lib/socket';

const ChatBox = ({ setShowSidebar }) => {
  const { selectChat, setSelectChat, liveChat, setLiveChat  } = useChat();
  const axiosInstance = useAxios();
  const { data: session, status } = useSession();
  const userId = session?.user?.userId;
 
  const { data: chatUser = {} } = useQuery({
    queryKey: ['chatUser', selectChat],
    enabled:!!selectChat,
    queryFn: async () => {
      const res = await axiosInstance.get(`/chats/chat-user/${selectChat}`);
     
      return res.data;
    },
  });



  // get message  server
  const { data:messages =[]} = useQuery({
    queryKey: ['getMessage', userId, chatUser?._id],
    enabled: !!userId && !!chatUser?._id,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/chats/messages?senderId=${userId}&receiverId=${chatUser?._id}`,
      );
      
      return res.data
    }
  });

  useEffect(() => {
    setLiveChat(messages || []);
  }, [JSON.stringify(messages)]);
 
 
  // get message socket io
  useEffect(() => {

    const handleReceive = (data) => {
      if (data.senderId === selectChat) {
        
         data._id= Date.now().toString(),
        setLiveChat(prev => [...prev,data]);
       }
     console.log(data);
    }
      
    
    socket.on('receiveMessage', handleReceive)

    
    return () => {
      socket.off('receiveMessage',handleReceive);
    }

  
  }, [selectChat])
  

    const handleMessage = async e => {
      e.preventDefault();
      try {
        const message = e.target.message.value;
        if (!message) {
          return toast.error('message is messing');
        }
        const body = {
          senderId: userId,
          receiverId: chatUser?._id,
          message,
        };

        socket.emit('sendMessage', body);
        const res = await axiosInstance.post('/chats/send-message', body);
        setLiveChat(prev => [...prev, res.data]);
        e.target.reset();
      } catch (error) {
        console.log(error);
      }
    };
  
 
  const { image, name } = chatUser;

  if (status === 'loading') {
    return <p>loading...</p>
  }

  if (!selectChat) {
    return (
      <div className="flex-1 flex flex-col min-w-0">
        {/*  Mobile এ Menu button */}
        <header className="h-16 border-b bg-white flex items-center px-4 lg:hidden">
          <button
            onClick={() => setShowSidebar(true)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl cursor-pointer transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Empty state */}
        <div className="flex-1 flex flex-col items-center justify-center bg-[#F8F9FA] text-gray-400">
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <Send className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
            <p className="font-medium">
              Please select a chat member to start messaging
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 flex flex-col min-w-0 bg-[#FDFDFD]">
      {/* Header */}
      <header className="h-20 border-b bg-white/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-4 md:px-8 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowSidebar(true)}
            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-xl cursor-pointer transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="relative">
            <div className="w-11 h-11 md:w-13 md:h-13 rounded-full p-0.5 border-2 border-blue-500/20">
              <Image
                src={image || 'https://i.pravatar.cc/100?u=rahim'}
                className="w-full h-full rounded-full object-cover"
                alt={name || 'user'}
                height={50}
                width={50}
              />
            </div>
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
          </div>
          <div>
            <h2 className="text-gray-800 font-bold text-base md:text-lg leading-tight">
              {name || 'User'}
            </h2>
            <div className="flex items-center gap-1.5">
              <p className="text-[11px] text-green-600 font-bold tracking-wider uppercase">
                Active Now
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="p-3 bg-gray-50 rounded-full text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer shadow-sm border border-gray-100">
            <Phone className="w-4 h-4" />
          </button>
          <button className="p-3 bg-gray-50 rounded-full text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer shadow-sm border border-gray-100">
            <Video className="w-4 h-4" />
          </button>
        </div>
      </header>
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-[#F8F9FA]/50 scroll-smooth">
        {liveChat.map(message => {
          const isMe = message?.senderId === userId;

          return (
            <div
              key={message?._id}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'} gap-3 group`}
            >
              {/* Incoming Message Avatar (Only for receiver) */}
              {!isMe && (
                <Image
                  src={chatUser?.image || 'https://i.pravatar.cc/100?u=rahim'}
                  className="w-8 h-8 object-cover object-top rounded-full self-end mb-5 border border-white shadow-sm"
                  alt="User"
                  height={30}
                  width={30}
                />
              )}

              <div
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} gap-1 max-w-[85%] md:max-w-[70%]`}
              >
                {/* Message Bubble */}
                <div
                  className={`px-5 py-3 rounded-2xl shadow-sm transition-all duration-200 ${
                    isMe
                      ? 'bg-blue-600 text-white rounded-br-none shadow-blue-100'
                      : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message?.message}
                  </p>
                </div>

                {/* Timestamp & Status */}
                <div className="flex items-center gap-2 px-1">
                  <span className="text-[10px] text-gray-400 font-medium">
                    {new Date(message?.createdAt).toDateString()}
                  </span>
                  {isMe && (
                    <span className="text-[10px] text-blue-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      • Read
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Input */}
      <footer className="p-4 md:p-6 bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
        <form
          onSubmit={handleMessage}
          className="max-w-6xl mx-auto flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2 transition-all focus-within:border-blue-300 focus-within:bg-white focus-within:shadow-md"
        >
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-yellow-500 transition-colors cursor-pointer"
          >
            <Smile className="w-6 h-6" />
          </button>

          <input
            required
            type="text"
            name="message"
            placeholder="Write a message..."
            className="flex-1 bg-transparent py-2.5 px-2 text-sm focus:outline-none text-gray-700"
          />

          {/* <button
            type="button"
            className=" block md:hidden p-3 rounded-xl bg-blue-600 text-white hover:text-blue-500 transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
          </button> */}

          <button className="  bg-blue-600 text-white cursor-pointer px-4 md:px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2 group">
            <span className=' hidden md:block'>Send</span>
            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </form>
      </footer>
    </main>
  );
};

export default ChatBox;
