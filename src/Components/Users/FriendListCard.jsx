
import { MessageCircle, UserMinus } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const FriendListCard = ({ friend, handleDelete }) => {
  const { image, name, _id: targetId } = friend || {};
 

  return (
    <div className="flex justify-between items-center bg-base-100 border border-slate-700/50 p-3 rounded-2xl  transition-all duration-300 shadow-sm group">
      {/* Left Section: Image and Name */}
      <div className="flex items-center">
        <div className="relative mr-3">
          <Image
            className="rounded-full w-10 h-10 object-cover object-top ring-2 ring-blue-500/20 group-hover:ring-blue-500 transition-all"
            src={image || '/polok.png'}
            alt={name || 'user'}
            height={40}
            width={40}
          />
          {/* Online Status Badge (Decorative) */}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#1e293b] rounded-full"></span>
        </div>

        <div>
          <h4 className=" font-medium text-sm sm:text-base tracking-wide">
            {name}
          </h4>
          <p className="text-xs text-slate-400"> Friend</p>
        </div>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleDelete(targetId, 'Unfriend')}
          title="Unfriend"
          className="p-2 cursor-pointer text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200"
        >
          <UserMinus size={18} />
        </button>

        <button
          title="Send Message"
          className="flex cursor-pointer items-center justify-center p-2 text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-900/20 transition-all duration-200 active:scale-95"
        >
          <MessageCircle size={18} />
        </button>
      </div>
    </div>
  );
};

export default FriendListCard;
