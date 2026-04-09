'use client'
import Image from 'next/image';
import React from 'react';
import { UserPlus, MessageCircle } from 'lucide-react';
import { useAxios } from '@/Hooks/useAxios';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const UsersCard = ({ user }) => {
  // Destructure with a fallback for image to avoid crashes
  const { name, image,_id } = user || {};
  const axiosInstance = useAxios();
  const session = useSession();
  const { userId } = session?.data?.user;
  if (session.status === 'loading') {
   return <p>loading...</p>
  }
 
  const handleAddFnd = async(id) => {
    try {
      
      const friendRequests = {
        senderId: userId,
        receiverId: id,
        
      };
      const res = await axiosInstance.post('/friendRequests', friendRequests);
      console.log(res.data)
      if (res?.data?.insertedId) {
        toast.success('Request Success')
      }
      if (res?.data?.message) {
        toast.error(res?.data?.message);
      }
      
       
    } catch (error) {
      console.log(error)
    }
  }

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
          onClick={()=>handleAddFnd(_id)}
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
