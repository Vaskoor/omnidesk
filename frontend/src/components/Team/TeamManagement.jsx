import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function TeamManagement() {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    api.get('/team').then(res => setTeams(res.data));
  }, []);
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Team & Roles</h2>
      <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4">Create Team</button>
      {teams.map(team => <div key={team._id} className="border p-3 mb-2 rounded">{team.name} – {team.members.length} members</div>)}
    </div>
  );
}
