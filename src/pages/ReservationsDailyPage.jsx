import React, { useState } from 'react';
import { Header } from '../components/common/Header/Header';
import { DailyCalendar } from '../components/reservations/daily/DailyCalendar/DailyCalendar';

const ReservationsDailyPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateData, setDateData] = useState([]);

  return (
    <div>
      <Header />
      <div className="reservations-daily--page">
        <DailyCalendar
          reservations={dateData}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          onChangeData={setDateData}
        />
      </div>
    </div>
  );
};
export default ReservationsDailyPage;
