import React, { useState } from 'react';
import api from '../../services/api';
import MediaUploader from './MediaUploader';
import ScheduleCalendar from './ScheduleCalendar';

export default function PostComposer() {
  const [content, setContent] = useState('');
  const [platforms, setPlatforms] = useState([]);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [scheduleDate, setScheduleDate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    formData.append('platforms', JSON.stringify(platforms));
    mediaFiles.forEach(file => formData.append('media', file));
    if (scheduleDate) formData.append('scheduleFor', scheduleDate);
    await api.post('/publisher/create', formData);
    alert('Post saved/scheduled!');
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Create Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea className="w-full border p-3 rounded mb-3" rows="4" placeholder="Write your caption..." value={content} onChange={e => setContent(e.target.value)} />
        <div className="flex gap-3 mb-3">
          {['facebook', 'instagram', 'tiktok', 'messenger'].map(p => (
            <label key={p} className="flex items-center gap-1">
              <input type="checkbox" value={p} onChange={(e) => setPlatforms(e.target.checked ? [...platforms, p] : platforms.filter(pl => pl !== p))} />
              {p}
            </label>
          ))}
        </div>
        <MediaUploader onFilesSelected={setMediaFiles} />
        <ScheduleCalendar onSelectDate={setScheduleDate} />
        <button type="submit" className="mt-4 bg-green-600 text-white px-6 py-2 rounded">Schedule / Draft</button>
      </form>
    </div>
  );
}
