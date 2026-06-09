import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import useSocket from '../../hooks/useSocket';
import MessageComposer from './MessageComposer';

export default function MessageThread({ conversation }) {
  const [messages, setMessages] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    api.get(`/inbox/messages/${conversation._id}`).then(res => setMessages(res.data));
    socket.emit('join_conversation', conversation._id);
    socket.on('new_message', (msg) => setMessages(prev => [...prev, msg]));
    return () => socket.off('new_message');
  }, [conversation._id]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto space-y-2 p-2">
        {messages.map(msg => (
          <div key={msg._id} className={`p-2 rounded max-w-xs ${msg.direction === 'inbound' ? 'bg-gray-200 self-start' : 'bg-blue-500 text-white self-end ml-auto'}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <MessageComposer conversationId={conversation._id} />
    </div>
  );
}
