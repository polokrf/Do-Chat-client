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
} from 'lucide-react';
import { useAxios } from '@/Hooks/useAxios';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useChat } from '@/Context/ChatProvider';

const UsersCard = ({ user, isLoading, setShowSidebar }) => {
  const { name, image, _id: targetId, email: targetEmail } = user || {};
  const axiosInstance = useAxios();
  const session = useSession();
  const { setSelectChat } = useChat();
  const { userId, email } = session?.data?.user || {};
  const queryClient = useQueryClient();

  // --- Logic remains strictly unchanged ---
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

  const handleAddFnd = async id => {
    try {
      const friendRequests = { senderId: userId, receiverId: id };
      const res = await axiosInstance.post('/friendRequests', friendRequests);
      
      if (res?.data?.insertedId) toast.success('Request Sent!');
      if (res?.data?.message) toast.error(res?.data?.message);
      queryClient.invalidateQueries(['senderRequest']);
    } catch (error) {
      console.log(error);
    }
  };

  const checkRequestStatus = () => {
    const friend = friends.some(
      fri =>
        (fri.senderId === userId && fri.receiverId === targetId) ||
        (fri.senderId === targetId && fri.userId === userId),
    );
    if (friend) return 'friend';
    const senderUser = sender.some(send => send.receiverId === targetId);
    if (senderUser) return 'sender';
    const requestUser = received.some(req => req.senderId === targetId);
    if (requestUser) return 'requester';
    return 'none';
  };

  const handleDelete = (id, title) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#ef4444',
      confirmButtonText: `Yes`,
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/friendRequests/delete?targetId=${id}`);
          queryClient.invalidateQueries([
            'senderRequest',
            'received',
            'friends',
          ]);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleAccept = async id => {
    try {
      await axiosInstance.patch(`/friendRequests/accept`, {
        userId,
        targetId: id,
      });
      toast.success(`New friend: ${name}`);
      queryClient.invalidateQueries(['friends', 'received']);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChat = id => {
    setSelectChat(id);
    setShowSidebar(false);
  };

  const status = checkRequestStatus();

  // Skeleton Loading
  if (session.status === 'loading' || isLoading) {
    return (
      <div className="animate-pulse bg-white rounded-xl p-4 my-2 border border-slate-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
          <div className="h-4 w-24 bg-slate-200 rounded"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-10 flex-1 bg-slate-100 rounded-lg"></div>
          <div className="h-10 flex-1 bg-slate-100 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border w-full border-slate-200 rounded-xl shadow-sm my-3 overflow-hidden">
      {/* Top Section: Profile Info */}
      <div className="p-3 flex items-center gap-3">
        <div className="relative shrink-0">
          <Image
            className="rounded-full w-12 h-12 object-cover border border-slate-100"
            src={image || 'https://via.placeholder.com/150'}
            alt={name}
            height={48}
            width={48}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-slate-900 text-[15px] truncate">
            {name}
          </h4>
          <p className="text-xs text-slate-500 capitalize">
            {status === 'friend' && 'Friend'}
            {status === 'sender' && 'Request Sent'}
            {status === 'requester' && 'Sent you a request'}
            
            {(status === 'none' && userId !== targetId) && 'Suggested for you'}
          
          </p>
        </div>
      </div>

      {/* Bottom Section: Action Buttons (FB Mobile Style) */}
      <div className="flex gap-2 p-3 pt-0">
        {status === 'friend' && (
          <>
            <button
              onClick={() => handleChat(targetId)}
              className="flex-1 cursor-pointer flex justify-center items-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm active:scale-95"
            >
              <MessageCircle size={20} />
            </button>
            <button
              onClick={() => handleDelete(targetId, 'Unfriend')}
              className="flex-1 cursor-pointer flex justify-center items-center py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors active:scale-95"
            >
              <UserMinus size={20} />
            </button>
          </>
        )}

        {status === 'sender' && (
          <>
            <button
              onClick={() => handleChat(targetId)}
              className="flex-1 cursor-pointer flex justify-center items-center py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors active:scale-95"
            >
              <MessageCircle size={20} />
            </button>
            <button
              onClick={() => handleDelete(targetId, 'Cancel Request')}
              className="flex-1 cursor-pointer flex justify-center items-center py-2 bg-slate-100 hover:bg-slate-200 text-red-500 rounded-lg transition-colors active:scale-95"
            >
              <XCircle size={20} />
            </button>
          </>
        )}

        {status === 'requester' && (
          <>
            <button
              onClick={() => handleAccept(targetId)}
              className="flex-1 cursor-pointer flex justify-center items-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm active:scale-95"
            >
              <UserCheck size={20} />
            </button>
            <button
              onClick={() => handleDelete(targetId, 'Delete Request')}
              className="flex-1 cursor-pointer flex justify-center items-center py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors active:scale-95"
            >
              <UserRoundX size={20} />
            </button>
          </>
        )}

        {status === 'none' && (
          <>
            <button
              onClick={() => handleAddFnd(targetId)}
              className={`flex-1 cursor-pointer flex justify-center items-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm active:scale-95 ${email === targetEmail ? 'hidden' : 'flex'}`}
            >
              <UserPlus size={20} />
            </button>
            <button
              onClick={() => handleChat(targetId)}
              className="flex-1 cursor-pointer flex justify-center items-center py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors active:scale-95"
            >
              <MessageCircle size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UsersCard;
