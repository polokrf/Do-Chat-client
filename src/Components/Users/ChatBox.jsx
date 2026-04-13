import React from 'react';
import { Menu, Paperclip, Phone, Send, Smile, Video } from 'lucide-react';
import { useChat } from '@/Context/ChatProvider';

const ChatBox = ({ setShowSidebar }) => {
  const { selectChat, setSelectChat } = useChat();
  return (
   <main className="flex-1 flex flex-col min-w-0 bg-white">
             {/* <ChatBox setShowSidebar={setShowSidebar} /> */}
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
                       <span className="text-[10px] text-gray-400 self-end">5:25 PM</span>
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
  );
};

export default ChatBox;