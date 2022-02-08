import React, { useState } from 'react';
import { WeeklyCalendar } from '../components/reservations/weekly/WeeklyCalendar/WeeklyCalendar';

const ReservationsWeeklyPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="reservations-weekly--page">
      <WeeklyCalendar reservations={[]} selectedDate={selectedDate} onDateChange={setSelectedDate} />
    </div>
  );
};
export default ReservationsWeeklyPage;