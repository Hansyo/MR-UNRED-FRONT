import React, { useState } from 'react';
import { MonthlyCalendar } from '../components/reservations/monthly/MonthlyCalendar';

const ReservationsMonthlyPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  return (
    <div className="reservations-daily--page">
      <MonthlyCalendar
        reservations={[]}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />
    </div>
  );
};
export default ReservationsMonthlyPage;
