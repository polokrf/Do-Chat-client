'use client';
import Image from 'next/image';
import React from 'react';
import {
  UserPlus,
  MessageCircle,
  UserMinus,
  UserCheck,
  XCircle,
  UserRoundX,
  Clock,
} from 'lucide-react';
import { useAxios } from '@/Hooks/useAxios';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

const UsersCard = ({ user ,isLoading}) => {
  const { name, image, _id: targetId, email: targetEmail } = user || {};
  const axiosInstance = useAxios();
  const session = useSession();
  const { userId, email } = session?.data?.user || {};

  // my friend request user
  const { data: sender = [] } = useQuery({
    queryKey: ['senderRequest', userId],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/friendRequests/senderRequest?userId=${userId}`,
      );
      return res.data;
    },
    enabled: !!userId,
  });

  // check any user send friend request
  const { data: received = [] } = useQuery({
    queryKey: ['received', userId],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/friendRequests/received?userId=${userId}`,
      );
      return res.data;
    },
    enabled: !!userId,
  });

  // get friend
  const { data: friends = [] } = useQuery({
    queryKey: ['friends', userId],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/friendRequests/friends?userId=${userId}`,
      );
      return res.data;
    },
    enabled: !!userId,
  });

  // send friend request
  const handleAddFnd = async id => {
    try {
      const friendRequests = { senderId: userId, receiverId: id };
      const res = await axiosInstance.post('/friendRequests', friendRequests);
      if (res?.data?.insertedId) {
        toast.success('Request Sent!');
      }
      if (res?.data?.message) {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
//  check user friend or no 
  const checkRequestStatus = () => {
    const friend = friends.some(
      fri =>
        (fri.senderId === userId && fri.receiverId === targetId) ||
        (fri.senderId === targetId && fri.receiverId === userId),
    );
    if (friend) return 'friend';

    const senderUser = sender.some(send => send.receiverId === targetId);
    if (senderUser) return 'sender';

    const requestUser = received.some(req => req.senderId === targetId);
    if (requestUser) return 'requester';

    return 'none';
  };

  const status = checkRequestStatus();

  if (session.status === 'loading' || isLoading) {
    return (
      <div className="animate-pulse flex items-center justify-between my-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-[50px] h-[50px] bg-slate-200 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-4 w-24 bg-slate-200 rounded"></div>
            <div className="h-3 w-16 bg-slate-200 rounded"></div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex items-center justify-between my-3 bg-white border border-slate-200 hover:border-blue-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl p-3">
      {/* User Info Section */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Image
            className="rounded-full w-[52px] h-[52px] object-cover border-2 border-white ring-1 ring-slate-100 group-hover:ring-blue-100 transition-all"
            src={image || 'https://via.placeholder.com/50'}
            alt={name || 'User'}
            height={52}
            width={52}
          />
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

        <div>
          <h4 className="font-bold text-slate-700 text-sm md:text-base leading-tight group-hover:text-blue-600 transition-colors">
            {name}
          </h4>
          <p className="text-slate-400 text-[11px] font-medium flex items-center gap-1">
            Active Now
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 md:gap-2">
        {status === 'friend' && (
          <>
            <button
              title="Unfriend"
              className="p-2.5 cursor-pointer text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
            >
              <UserMinus size={20} />
            </button>
            <button
              title="Send Message"
              className="p-2.5 cursor-pointer text-blue-500 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-full transition-all"
            >
              <MessageCircle size={20} />
            </button>
          </>
        )}

        {status === 'sender' && (
          <>
            <button
              title="Cancel Request"
              className="p-2.5 cursor-pointer text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all"
            >
              <XCircle size={20} />
            </button>
          </>
        )}

        {status === 'requester' && (
          <div className="flex items-center gap-1">
            <button
              title="Accept Request"
              className="p-2.5 cursor-pointer text-green-600 hover:bg-green-50 rounded-full transition-all"
            >
              <UserCheck size={20} />
            </button>
            <button
              title="Delete Request"
              className="p-2.5 cursor-pointer text-red-400 hover:bg-red-50 rounded-full transition-all"
            >
              <UserRoundX size={20} />
            </button>
          </div>
        )}

        {status === 'none' && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleAddFnd(targetId)}
              title="Add Friend"
              className={`p-2.5 text-blue-600 hover:bg-blue-600 hover:text-white bg-blue-50 rounded-full cursor-pointer transition-all ${email === targetEmail ? 'hidden' : 'flex'}`}
            >
              <UserPlus size={20} />
            </button>
            <button
              title="Send Message"
              className="p-2.5 cursor-pointer text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
            >
              <MessageCircle size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersCard;
