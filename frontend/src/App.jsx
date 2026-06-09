import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import UnifiedInbox from './components/Inbox/UnifiedInbox';
import PostComposer from './components/Publisher/PostComposer';
import Dashboard from './components/Analytics/Dashboard';
import TeamManagement from './components/Team/TeamManagement';
import OAuthConnections from './components/Settings/OAuthConnections';
import Login from './components/Login';
import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector((state) => state.auth);
  if (!user) return <Login />;
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/inbox" />} />
          <Route path="/inbox" element={<UnifiedInbox />} />
          <Route path="/publisher" element={<PostComposer />} />
          <Route path="/analytics" element={<Dashboard />} />
          <Route path="/team" element={<TeamManagement />} />
          <Route path="/settings" element={<OAuthConnections />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
