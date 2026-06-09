import React, { useState } from 'react';
import api from '../../services/api';

export default function MessageComposer({ conversationId }) {
  const [text, setText] = useState('');
  const send = async () => {
    if (!text.trim()) return;
    await api.post('/inbox/reply', { conversationId, content: text });
    setText('');
  };
  return (
    <div className="border-t p-3 flex gap-2">
      <input className="flex-1 border rounded px-3 py-2" value={text} onChange={e => setText(e.target.value)} placeholder="Type a reply..." />
      <button onClick={send} className="bg-blue-600 text-white px-4 rounded">Send</button>
    </div>
  );
}
