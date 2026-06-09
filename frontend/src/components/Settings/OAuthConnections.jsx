import React from 'react';

export default function OAuthConnections() {
  const connectPlatform = (platform) => {
    window.location.href = `http://localhost:5000/api/auth/${platform}`;
  };
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Connect Social Accounts</h2>
      <div className="space-y-3">
        <button onClick={() => connectPlatform('facebook')} className="bg-blue-700 text-white px-4 py-2 rounded w-full">Connect Facebook</button>
        <button onClick={() => connectPlatform('instagram')} className="bg-pink-600 text-white px-4 py-2 rounded w-full">Connect Instagram</button>
        <button onClick={() => connectPlatform('tiktok')} className="bg-black text-white px-4 py-2 rounded w-full">Connect TikTok</button>
      </div>
    </div>
  );
}
