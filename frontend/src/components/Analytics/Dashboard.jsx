import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import api from '../../services/api';

Chart.register(...registerables);

export default function Dashboard() {
  const [stats, setStats] = useState({ totalPosts: 0, engagedConversations: 0 });
  useEffect(() => {
    api.get('/analytics/dashboard').then(res => setStats(res.data));
  }, []);

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{ label: 'Reach', data: [120, 200, 340, 230, 410, 550, 700], borderColor: 'blue' }]
  };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">Total Posts: {stats.totalPosts}</div>
        <div className="bg-white p-4 rounded shadow">Open Conversations: {stats.engagedConversations}</div>
      </div>
      <div className="bg-white p-4 rounded shadow"><Line data={data} /></div>
    </div>
  );
}
