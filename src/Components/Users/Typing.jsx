import Image from 'next/image';
import React from 'react';

const Typing = ({chatUser}) => {
  return (
    <div className="flex justify-start gap-3 mb-4 animate-in fade-in slide-in-from-left-2 duration-300">
      <Image
        src={chatUser?.image || 'https://i.pravatar.cc/100?u=rahim'}
        className="w-8 h-8 object-cover rounded-full self-end border border-white shadow-sm"
        alt="User"
        height={32}
        width={32}
      />

      <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm flex items-center gap-1">
        {/* Animated Dots */}
        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
      </div>
    </div>
  );
};

export default Typing;