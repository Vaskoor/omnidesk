import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export default function useSocket() {
  const socketRef = useRef(null);
  if (!socketRef.current) {
    socketRef.current = io('http://localhost:5000');
  }
  useEffect(() => {
    return () => socketRef.current.disconnect();
  }, []);
  return socketRef.current;
}
