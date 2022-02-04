import React, { useState } from 'react';
import { DailyCalendar } from '../components/reservations/daily/DailyCalendar/DailyCalendar';


const ReservationsDailyPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateData, setDateData] = useState([]);
  
  return (
    <div className="reservations-daily--page">
      <DailyCalendar reservations={dataData} selectedDate={selectedDate} onDateChange={setSelectedDate} onChangeData = {setDateData} />
    </div>
  );
};
export default ReservationsDailyPage;
