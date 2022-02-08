import React from 'react';

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

  const ThisWeekStart =`${selectedDate.getFullYear()}/${selectedDate.getMonth() + 1}/${(selectedDate.getDate() - selectedDate.getDay())}`;
  const ThisWeekEnd = `${selectedDate.getFullYear()}/${selectedDate.getMonth() + 1}/${(selectedDate.getDate() - selectedDate.getDay() + 6)}`;


  return (
    <div className="reservations-weekly--date-switch-container">
      <div className='reservations-weekly--date-switch-buttons'>
        <button
          className="reservations-weekly--date-switch-button"
          onClick={onClickPrev}
        >
         先週
        </button>
      </div>
        <div className="reservations-weekly--date">{ThisWeekStart} - {ThisWeekEnd}</div>
      <div className='reservations-weekly--date-switch-buttons'>
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
