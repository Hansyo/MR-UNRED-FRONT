import React from 'react';
import { startOfWeek, endOfWeek, format } from 'date-fns';
import ja from 'date-fns/locale/ja'
import './DateSwitcher.css';

export const DateSwitcher = ({ selectedDate, onChange }) => {
  const onClickPrev = () => {
    const prevDate = new Date(selectedDate);
    prevDate.setDate(prevDate.getDate() - 7);
    onChange(prevDate);
  };

  const onClickNext = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 7);
    onChange(nextDate);
  };

  const ThisWeekStart = format(startOfWeek(selectedDate), 'PPPP', {locale: ja});
  const ThisWeekEnd = format(endOfWeek(selectedDate), 'PPPP', {locale: ja});

  return (
    <div className="reservations-weekly--date-switch-container">
      <div className="reservations-weekly--date-switch-buttons">
        <button
          className="reservations-weekly--date-switch-button"
          onClick={onClickPrev}
        >
          先週
        </button>
      </div>
      <div className="reservations-weekly--date">
        {ThisWeekStart} - {ThisWeekEnd}
      </div>
      <div className="reservations-weekly--date-switch-buttons">
        <button
          className="reservations-weekly--date-switch-button"
          onClick={onClickNext}
        >
          来週
        </button>
      </div>
    </div>
  );
};
