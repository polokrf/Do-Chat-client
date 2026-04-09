import Image from 'next/image';
import React from 'react';
import { UserPlus, MessageCircle } from 'lucide-react';

const UsersCard = ({ user }) => {
  // Destructure with a fallback for image to avoid crashes
  const { name, image } = user || {};

  return (
    <div className="flex items-center justify-between my-3 bg-base-100 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-xl p-3">
      {/* User Info Section */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Image
            className="rounded-full w-[50px] h-[50px] object-cover object-top border border-slate-200"
            src={image || 'https://via.placeholder.com/50'}
            alt={name || 'User'}
            height={50}
            width={50}
          />
          {/* Status Indicator Dot */}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

        <div>
          <h4 className="font-semibold text-slate-800 leading-tight">{name}</h4>
          <p className="text-green-500 text-xs font-medium">Active Now</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          title="Add Friend"
          className="p-2 text-slate-600 cursor-pointer hover:bg-blue-50 hover:text-blue-600 rounded-full transition-colors"
        >
          <UserPlus size={20} />
        </button>
        <button
          title="Send Message"
          className="p-2 text-slate-600 cursor-pointer hover:bg-green-50 hover:text-green-600 rounded-full transition-colors"
        >
          <MessageCircle size={20} />
        </button>
      </div>
    </div>
  );
};

export default UsersCard;
