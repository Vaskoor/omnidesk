import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold mb-6">OmniDesk</h1>
        <nav className="space-y-2">
          <Link to="/inbox" className="block p-2 hover:bg-gray-700 rounded">📥 Unified Inbox</Link>
          <Link to="/publisher" className="block p-2 hover:bg-gray-700 rounded">✏️ Publisher</Link>
          <Link to="/analytics" className="block p-2 hover:bg-gray-700 rounded">📊 Analytics</Link>
          <Link to="/team" className="block p-2 hover:bg-gray-700 rounded">👥 Team</Link>
          <Link to="/settings" className="block p-2 hover:bg-gray-700 rounded">⚙️ Connections</Link>
          <button onClick={handleLogout} className="block w-full text-left p-2 hover:bg-gray-700 rounded">🚪 Logout</button>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 overflow-auto p-6">{children}</main>
    </div>
  );
}
