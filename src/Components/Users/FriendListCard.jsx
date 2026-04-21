
import { useChat } from '@/Context/ChatProvider';
import { MessageCircle, UserMinus } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const FriendListCard = ({ friend, handleDelete, setShowSidebar }) => {
  const { selectChat, setSelectChat,isOnline } = useChat();
  const { image, name, _id: targetId } = friend || {};

  const handleChat = id => {
    setSelectChat(id)
    setShowSidebar(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm my-3 overflow-hidden group transition-all duration-300 hover:border-blue-200">
      {/* Top Section: User Info (FB Style) */}
      <div className="p-3 flex items-center gap-3">
        <div className="relative shrink-0">
          <Image
            className="rounded-full w-12 h-12 object-cover object-top ring-2 ring-slate-50 group-hover:ring-blue-100 transition-all"
            src={image || '/polok.png'}
            alt={name || 'user'}
            height={48}
            width={48}
          />
          {/* Online Status Badge */}
          {isOnline[targetId] === 'online' && (
            <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-sm"></span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-slate-900 text-[15px] truncate tracking-tight group-hover:text-blue-600 transition-colors">
            {name}
          </h4>
          <p className="text-xs text-slate-500 font-medium">Friend</p>
        </div>
      </div>

      {/* Bottom Section: Action Buttons (Full Width Mobile Style) */}
      <div className="flex gap-2 p-3 pt-0">
        {/* Message Button - Primary Action */}
        <button
          onClick={() => handleChat(targetId)}
          title="Send Message"
          className="flex-1 cursor-pointer flex items-center justify-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm shadow-blue-100 transition-all active:scale-95"
        >
          <MessageCircle size={20} />
        </button>

        {/* Unfriend Button - Secondary Action */}
        <button
          onClick={() => handleDelete(targetId, 'Unfriend')}
          title="Unfriend"
          className="flex-1 cursor-pointer flex items-center justify-center py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-all active:scale-95"
        >
          <UserMinus size={20} />
        </button>
      </div>
    </div>
  );
};

export default FriendListCard;
