import React, { useState } from 'react';
import { DailyCalendar } from '../components/reservations/daily/DailyCalendar/DailyCalendar';
import { DateSwitcher } from '../components/reservations/daily/DateSwitcher';

const ReservationsDailyPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="reservations-daily--page">
      <DateSwitcher selectedDate={selectedDate} onChange={setSelectedDate} />
      <DailyCalendar reservations={[]} />
    </div>
  );
};
export default ReservationsDailyPage;
