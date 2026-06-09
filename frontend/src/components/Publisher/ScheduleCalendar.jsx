import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function ScheduleCalendar({ onSelectDate }) {
  const [value, setValue] = useState(new Date());
  const handleChange = (date) => {
    setValue(date);
    onSelectDate(date);
  };
  return (
    <div className="my-3">
      <p className="font-medium">Schedule for later (optional)</p>
      <Calendar onChange={handleChange} value={value} />
    </div>
  );
}
