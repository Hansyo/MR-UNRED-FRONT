import React from 'react';

import './DateSwitcher.css';

export const DateSwitcher = ({ selectedDate, onChange }) => {
  const onClickPrev = () => {
    const prevDate = new Date(selectedDate);
    prevDate.setDate(prevDate.getDate() - 1);
    onChange(prevDate);
  };

  const onClickNext = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    onChange(nextDate);
  };

  const dateString = `${selectedDate.getFullYear()}/${
    selectedDate.getMonth() + 1
  }/${selectedDate.getDate()}`;

  return (
    <div className="reservations-daily--date-switch-container">
      <button
        className="reservations-daily--date-switch-button"
        onClick={onClickPrev}
      >
        前へ
      </button>
      <div className="reservations-daily--date">{dateString}</div>
      <button
        className="reservations-daily--date-switch-button"
        onClick={onClickNext}
      >
        次へ
      </button>
    </div>
  );
};
