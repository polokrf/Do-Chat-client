import { useAxios } from '@/Hooks/useAxios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React from 'react';
import FriendListCard from './FriendListCard';
import Swal from 'sweetalert2';

const FriendsList = () => {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  const session = useSession()
  const userId =session?.data?.user?.userId
  const { data: friends =[] } = useQuery({
    queryKey: ['myFriends', userId],
    enabled: !!userId,
    queryFn: async () => {
      const res = await axiosInstance.get(`/friends?userId=${userId}`);
      return res.data
    }
  });
  

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
         const res= await axiosInstance.delete(`/friendRequests/delete?targetId=${id}`);
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
    <div className="p-3">
      {friends.map(friend => (
        <FriendListCard
          userId={userId}
          key={friend._id}
          friend={friend}
          handleDelete={handleDelete}
        ></FriendListCard>
      ))}
    </div>
  );
};

export default FriendsList;