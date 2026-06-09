import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setConversations } from '../../slices/inboxSlice';
import api from '../../services/api';
import useSocket from '../../hooks/useSocket';
import MessageThread from './MessageThread';

export default function UnifiedInbox() {
  const dispatch = useDispatch();
  const { conversations } = useSelector((state) => state.inbox);
  const [selectedConv, setSelectedConv] = useState(null);
  const socket = useSocket();

  useEffect(() => {
    api.get('/inbox/conversations').then(res => dispatch(setConversations(res.data)));
    socket.on('inbox_update', () => {
      api.get('/inbox/conversations').then(res => dispatch(setConversations(res.data)));
    });
    return () => socket.off('inbox_update');
  }, []);

  return (
    <div className="flex h-full gap-4">
      <div className="w-1/3 bg-white rounded-lg shadow p-4 overflow-auto">
        {conversations.map(conv => (
          <div key={conv._id} onClick={() => setSelectedConv(conv)} className="p-3 border-b cursor-pointer hover:bg-gray-50">
            <p><strong>{conv.contactId?.name || 'User'}</strong> <span className="text-xs text-gray-500">{conv.platform}</span></p>
            <p className="text-sm text-gray-600 truncate">Last message: {new Date(conv.lastMessageAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <div className="flex-1 bg-white rounded-lg shadow p-4">
        {selectedConv ? <MessageThread conversation={selectedConv} /> : <p className="text-gray-400 text-center mt-20">Select a conversation</p>}
      </div>
    </div>
  );
}
