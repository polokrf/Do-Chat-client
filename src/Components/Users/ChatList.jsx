import React from 'react';

const ChatList = () => {
  return (
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
          <span className="text-[10px] text-white/40 font-light">5:25 PM</span>
        </div>
        <p className="text-xs text-white/70 truncate">Hey, what's up?</p>
      </div>
    </div>
  );
};

export default ChatList;