import React, { useState } from 'react';
import { DailyCalendar } from '../components/reservations/daily/DailyCalendar/DailyCalendar';
import { DateSwitcher } from '../components/reservations/daily/DateSwitcher';


const ReservationsDailyPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateData, setDateData] = useState([]);
  
  return (
    <div className="reservations-daily--page">
      <DateSwitcher selectedDate={selectedDate} onChange={setSelectedDate}onChangeData = { setDateData }/> 
      <DailyCalendar reservations={dateData} />
    </div>
  );
};
export default ReservationsDailyPage;
