import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/common/Header/Header';
import { DailyCalendar } from '../components/reservations/daily/DailyCalendar/DailyCalendar';

const ReservationsDailyPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateData, setDateData] = useState([]);

  return (
    <div>
      <Header />
      <div className="daily-container--btn">
      <Link className="daily-transition--btn" to="/reservations/weekly">
        週毎表示
        </Link>
        <button className="daily-transition--btn" onClick={() => {setSelectedDate(new Date())}}>
        本日
        </button>
        <Link className="daily-transition--btn" to="/reservations/monthly">
        月毎表示
      </Link>
      </div>
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
