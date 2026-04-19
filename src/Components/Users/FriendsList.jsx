import { useAxios } from '@/Hooks/useAxios';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import FriendListCard from './FriendListCard';
import Swal from 'sweetalert2';
import { useInView } from 'react-intersection-observer';

const FriendsList = ({ setShowSidebar }) => {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  const session = useSession();
  const userId = session?.data?.user?.userId;
  const {ref,inView} = useInView()
  const { data ,fetchNextPage,hasNextPage,isFetchingNextPage} = useInfiniteQuery({
    queryKey: ['myFriends', userId],
    enabled: !!userId,
    queryFn: async ({pageParam=null}) => {
      const res = await axiosInstance.get(`/friends?userId=${userId}&cursor=${pageParam || ''}`);
      return res.data;
    },
    getNextPageParam: lastPage => lastPage.nextCursor,
    initialPageParam:null
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])
  
  const friends = data?.pages?.flatMap(page => page.friends) || [];

  const handleDelete = (id, type) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${type} it!`,
    }).then(async result => {
      try {
        const res = await axiosInstance.delete(
          `/friendRequests/delete?targetId=${id}`,
        );
        if (result.isConfirmed)
          Swal.fire({
            title: type,
            text: `Your ${type}`,
            icon: 'success',
          });
        queryClient.invalidateQueries(['myFriends']);
      } catch (error) {
        console.log(error);
      }
    });
  };


  
  return (
    <div className="p-3 overflow-y-auto custom-scrollbar">
      {friends.map(friend => (
        <FriendListCard
          userId={userId}
          key={friend._id}
          friend={friend}
          setShowSidebar={setShowSidebar}
          handleDelete={handleDelete}
        ></FriendListCard>
      ))}

      <div ref={ref} className="h-14 flex items-center justify-center w-full">
        {isFetchingNextPage && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/20 border-t-white animate-spin rounded-full"></div>
            <span className="text-xs text-white/60">Loading more...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsList;