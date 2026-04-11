import React, { useState } from 'react';
import UserRequest from './UserRequest';
import MyRequest from './MyRequest';
import { useAxios } from '@/Hooks/useAxios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const RequestList = () => {
  const [requestTab, setRequestTab] = useState('user-request');
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  const session = useSession();
  const userId = session?.data?.user?.userId;

  const { data: myRequests = [] } = useQuery({
    queryKey: ['myRequest', userId],
    enabled: !!userId,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/requests/my-request?userId=${userId}`,
      );
      return res.data;
    },
  });

  const { data: userRequests = [] } = useQuery({
    queryKey: ['userRequest', userId],
    enabled: !!userId,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/requests/user-request?userId=${userId}`,
      );
      return res.data;
    },
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
             queryClient.invalidateQueries(['userRequest']);
             queryClient.invalidateQueries(['myRequest']);
           } catch (error) {
             console.log(error);
           }
         });
  };

  const handleAccept =async( id) => {
   try {
      const res = await axiosInstance.patch(`/friendRequests/accept`,{userId,targetId:id})
      console.log(res)
      toast.success(`your new friend`)
      queryClient.invalidateQueries(['userRequest']);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 ">
      {/* Header & Tabs */}
      <div className="flex items-center justify-between border-b border-white/10 mb-6 pb-2">
        <h2 className="text-xl font-semibold text-white tracking-tight">
          Requests
        </h2>

        <div className="flex gap-4 text-sm font-medium">
          <button
            onClick={() => setRequestTab('user-request')}
            className={`relative pb-2 transition-colors duration-300 ${
              requestTab === 'user-request'
                ? 'text-white'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            Received
            {requestTab === 'user-request' && (
              <span className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-blue-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setRequestTab('my-request')}
            className={`relative pb-2 transition-colors duration-300 ${
              requestTab === 'my-request'
                ? 'text-white'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            Sent
            {requestTab === 'my-request' && (
              <span className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-blue-500 rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="space-y-3 transition-all duration-500 ease-in-out">
        {requestTab === 'user-request' ? (
          userRequests.length > 0 ? (
            userRequests.map(req => (
              <div
                key={req._id}
                className="animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <UserRequest
                  handleDelete={handleDelete}
                  handleAccept={handleAccept}
                  req={req}
                />
              </div>
            ))
          ) : (
            <EmptyState message="No incoming requests yet." />
          )
        ) : myRequests.length > 0 ? (
          myRequests.map(myReq => (
            <div
              key={myReq._id}
              className="animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              <MyRequest handleDelete={handleDelete} myReq={myReq} />
            </div>
          ))
        ) : (
          <EmptyState message="You haven't sent any requests." />
        )}
      </div>
    </div>
  );
};

// Small helper component for a clean "No Data" view
const EmptyState = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-20 text-white/20 ">
    <p className="text-sm italic">{message}</p>
  </div>
);

export default RequestList;
