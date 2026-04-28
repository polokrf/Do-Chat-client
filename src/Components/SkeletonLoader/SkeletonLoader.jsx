import React from 'react';

const ChatListSkeleton = () => {
  return (
    <div className="w-full space-y-4 p-4 animate-pulse">
      {/* Search Bar Skeleton */}
      <div className="h-10 bg-white/10 rounded-lg w-full mb-6"></div>

      {/* Tabs Skeleton */}
      <div className="flex space-x-4 mb-4">
        <div className="h-4 bg-white/20 rounded w-12"></div>
        <div className="h-4 bg-white/10 rounded w-12"></div>
        <div className="h-4 bg-white/10 rounded w-12"></div>
      </div>

      <hr className="border-white/10 mb-4" />

      {/* Chat Item Skeletons */}
      {[1, 2, 3, 4, 5].map(item => (
        <div
          key={item}
          className="flex items-center space-x-3 p-3 rounded-xl bg-white/5"
        >
          {/* Avatar Circle */}
          <div className="w-12 h-12 bg-white/20 rounded-full"></div>

          {/* Text Content */}
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-center">
              <div className="h-4 bg-white/20 rounded w-24"></div>
              <div className="h-3 bg-white/10 rounded w-16"></div>
            </div>
            <div className="h-3 bg-white/10 rounded w-32"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatListSkeleton;
