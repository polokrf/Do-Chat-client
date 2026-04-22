import Image from 'next/image';
import React from 'react';
import { Check, X, UserPlus } from 'lucide-react';
import { useChat } from '@/Context/ChatProvider';

const MessageRequest = ({
  megRef,
  messageReq = [],
  handleMegAcDe,
  ref,
  isReqNext,
}) => {
  return (
    <dialog ref={megRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-[#001E3C] border border-blue-400/20 p-0 overflow-hidden shadow-2xl">
        {/* Header Section */}
        <div className="bg-white px-6 py-5 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-[#001E3C] flex items-center gap-2">
              <UserPlus size={22} />
              Message Requests
            </h3>
            <p className="text-xs text-blue-900/60 font-medium">
              New people want to connect with you
            </p>
          </div>
          <form method="dialog">
            <button className="text-blue-900/40 hover:text-blue-900 transition-colors">
              <X size={20} />
            </button>
          </form>
        </div>

        {/* Request List */}
        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
          {messageReq.length > 0 ? (
            messageReq.map((chat,i) => (
              <div
                key={chat?._id || i}
                className="flex items-center justify-between px-6 py-5 border-b border-blue-400/10 hover:bg-white/5 transition-all group"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Avatar with Blue Border */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-500/30 group-hover:ring-blue-400 transition-all">
                      <Image
                        src={chat?.image || 'https://i.pravatar.cc/100?u=rahim'}
                        className="object-cover"
                        alt={chat?.name || 'user'}
                        width={48}
                        height={48}
                      />
                    </div>
                    <div
                      ref={ref}
                      className="h-14 flex items-center justify-center w-full"
                    ></div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-white font-bold text-sm truncate uppercase tracking-wide">
                        {chat?.name}
                      </p>
                      <span className="text-[10px] text-blue-300/50 font-medium whitespace-nowrap">
                        {new Date(chat?.lastSeen).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-blue-100/60 truncate mt-0.5 italic">
                      {chat?.lastMessage || 'Wants to start a conversation'}
                    </p>
                  </div>
                </div>

                {/* Actions: Blue & White Theme */}
                <div className="flex items-center gap-3 ml-4">
                  <button
                    title="Accept"
                    onClick={() => handleMegAcDe(chat._id, 'accept')}
                    className="p-2 cursor-pointer rounded-lg bg-blue-500 text-white hover:bg-white hover:text-blue-600 transition-all active:scale-90 shadow-lg shadow-blue-500/20"
                  >
                    <Check size={18} strokeWidth={3} />
                  </button>
                  <button
                    title="Decline"
                    onClick={() => handleMegAcDe(chat._id, 'delete')}
                    className="p-2 cursor-pointer rounded-lg bg-white/10 text-white/60 hover:bg-red-500 hover:text-white transition-all active:scale-90"
                  >
                    <X size={18} strokeWidth={2} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center flex flex-col items-center">
              <div className="p-4 rounded-full bg-white/5 mb-3">
                <UserPlus size={32} className="text-blue-400/30" />
              </div>
              <p className="text-blue-100/40 text-sm">
                No pending requests at the moment
              </p>
            </div>
          )}
          {isReqNext && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/20 border-t-white animate-spin rounded-full"></div>
              <span className="text-xs text-white/60">Loading more...</span>
            </div>
          )}
        </div>
      </div>

      <form method="dialog">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default MessageRequest;
