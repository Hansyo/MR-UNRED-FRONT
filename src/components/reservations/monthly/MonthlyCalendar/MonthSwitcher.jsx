import React from 'react';

export const MonthSwitcher = ({ selectedMonth, onChange }) => {
  const onClickPrev = () => {
    const prevDate = new Date(selectedMonth);
    prevDate.setMonth(prevDate.getMonth() - 1);
    onChange(prevDate);
  };

  const onClickNext = () => {
    const nextDate = new Date(selectedMonth);
    nextDate.setMonth(nextDate.getMonth() + 1);
    onChange(nextDate);
  };

  const monthString = `${selectedMonth.getFullYear()}年${
    selectedMonth.getMonth() + 1
  }月`;

  return (
    <div className="monthly-calendar--header-month-switch-container">
      <div className="monthly-calendar--header-month-switch-buttons">
        <button
          className="monthly-calendar--header-month-switch-button"
          onClick={onClickPrev}
        >
          前へ
        </button>
      </div>
      <div className="monthly-calendar--header-month">{monthString}</div>
      <div className="monthly-calendar--header-month-switch-buttons">
        <button
          className="monthly-calendar--header-month-switch-button"
          onClick={onClickNext}
        >
          次へ
        </button>
      </div>
    </div>
  );
};
