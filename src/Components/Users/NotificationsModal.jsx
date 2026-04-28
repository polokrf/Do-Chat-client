'use client';
import { useAxios } from '@/Hooks/useAxios';
import socket from '@/lib/socket';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const NotificationsModal = ({
  notificationRef,
  userId,
  setNotificationLength,
}) => {
  const axiosInstance = useAxios();
  const { ref, inView } = useInView();
  const router = useRouter();
  const queryClient = useQueryClient();
  

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['notificationReceive', userId],
      enabled: !!userId,
      queryFn: async ({ pageParam = null }) => {
        const res = await axiosInstance.get(
          `/notifications?userId=${userId}&cursor=${pageParam || ''}`,
        );
        return res.data;
      },
      getNextPageParam: lastPage => lastPage.nextCursor,
      initialPageParam: null,
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // get notification form socket.io
  useEffect(() => {
    if (!userId) return;

    const handleNotification = newData => {
      // console.log('data', newData);

      queryClient.setQueryData(['notificationReceive', userId], oldData => {
        if (!oldData) return oldData;

        const firstPage = oldData.pages[0];

        const alreadyExists = firstPage.result.some(n => n._id === newData._id);
        if (alreadyExists) return oldData;

        return {
          ...oldData,
          pages: [
            {
              ...firstPage,
              result: [newData, ...firstPage.result],
              //  users array sender info add
              users: [...(firstPage.users || []), newData.senderInfo].filter(
                // duplicate user prevent
                (u, i, arr) => arr.findIndex(x => x._id === u._id) === i,
              ),
            },
            ...oldData.pages.slice(1),
          ],
        };
      });
    };
    socket.on('receiveNotifications', handleNotification);
    return () => {
      socket.off('receiveNotifications', handleNotification);
    };
  }, [userId, queryClient]);

  const myNotification = data?.pages?.flatMap(page => page.result) || [];
  const myNotificationUser = data?.pages?.flatMap(page => page.users) || [];
  // console.log(myNotification)
  useEffect(() => {
    if (myNotification?.length) {
      setNotificationLength(myNotification?.length);
    } else {
      setNotificationLength(null)
   }
  },[myNotification])

  const getWhoSentNotification = id => {
    return myNotificationUser.find(sentId => sentId?._id === id);
  };

  const handleNavigate = async notification => {
    try {
      router.push(notification?.url);
      notificationRef.current.close();
      const res = await axiosInstance.patch('/notifications/update-isRead', {
        id: notification?._id,
      });
      queryClient.invalidateQueries(['notificationReceive']);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <dialog
        ref={notificationRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle backdrop-blur-sm"
      >
        <div className="modal-box p-0 bg-white overflow-hidden max-w-md border border-slate-200 shadow-2xl rounded-xl">
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#191970] text-white border-b border-white/10">
            <h3 className="font-bold text-lg">Notifications</h3>
            <form method="dialog">
              <button className="text-white/70 cursor-pointer hover:text-white transition-colors">
                <X size={20} />
              </button>
            </form>
          </div>

          {/* Content Area */}
          <div className="max-h-[60vh] overflow-y-auto overflow-x-hidden">
            {myNotification.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {myNotification.map((notification, i) => {
                  const sender = getWhoSentNotification(notification?.senderId);
                  return (
                    <div
                      key={notification?._id || i}
                      onClick={() => handleNavigate(notification)}
                      className="flex items-start gap-4 px-6 py-4 transition-colors cursor-pointer hover:bg-slate-50 group"
                    >
                      <div className="relative flex-shrink-0">
                        <Image
                          className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-200"
                          src={
                            sender?.image || 'https://via.placeholder.com/50'
                          }
                          alt="sender"
                          width={50}
                          height={50}
                        />
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-[#191970] rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-800 leading-tight">
                          <span className="font-bold text-[#191970] mr-1">
                            {sender?.name}
                          </span>
                          <span className="text-slate-600">
                            {notification?.message}
                          </span>
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1 uppercase font-semibold tracking-wider">
                          Just now
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-slate-400 font-medium italic">
                  No notifications yet
                </p>
              </div>
            )}

            {/* Infinite Scroll Loader */}
            <div
              ref={ref}
              className="h-16 flex items-center justify-center w-full bg-slate-50/50"
            >
              {isFetchingNextPage ? (
                <div className="flex items-center gap-3 px-4 py-2 bg-[#191970] rounded-full shadow-md">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white animate-spin rounded-full"></div>
                  <span className="text-xs font-medium text-white">
                    Loading more...
                  </span>
                </div>
              ) : hasNextPage ? (
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                  Scroll for more
                </span>
              ) : (
                <span className="text-[10px] text-slate-300 uppercase tracking-widest font-bold">
                  End of list
                </span>
              )}
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default NotificationsModal;
