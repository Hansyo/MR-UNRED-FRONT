import React, { useState } from 'react';
import { DateSwitcher } from '../components/reservations/daily/DateSwitcher';

const ReservationsDailyPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <DateSwitcher selectedDate={selectedDate} onChange={setSelectedDate} />
    </div>
  );
};
export default ReservationsDailyPage;
