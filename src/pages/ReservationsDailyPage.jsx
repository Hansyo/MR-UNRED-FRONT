import React, { useState } from 'react';
import { DailyCalendar } from '../components/reservations/daily/DailyCalendar/DailyCalendar';

const ReservationsDailyPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="reservations-daily--page">
      <DailyCalendar reservations={[]} selectedDate={selectedDate} onDateChange={setSelectedDate} />
    </div>
  );
};
export default ReservationsDailyPage;
