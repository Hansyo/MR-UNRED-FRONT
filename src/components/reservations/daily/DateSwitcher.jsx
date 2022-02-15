import { React, useEffect } from 'react';
import { getReserve } from '../../../apis/getReservation';
import './DateSwitcher.css';

export const DateSwitcher = ({ selectedDate, onChange, onChangeData }) => {
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
  
  const receiveReserve = async () => {
    const roomTotal = 6;
    const roomNames = ["会議室1","会議室2","会議室3","会議室4","会議室5","会議室6"];
    let roomId = '';
    let getReserveData;
    const items = [];
    const startDateTime = new Date(selectedDate);
    const endDateTime = new Date(selectedDate);
    startDateTime.setHours(0, 0, 0, 0);
    endDateTime.setHours(23, 59, 59, 0);
    
    for (let i = 1; i <= roomTotal; i++) {
      roomId = String(i);
      getReserveData = await getReserve(
        startDateTime,
        endDateTime,
        roomId,
      ); 
      
      items.push({
        id: i,
        name: roomNames[i - 1],
        reservations: getReserveData,
      });
    };
    onChangeData(items);
  };

  useEffect(() => {
    receiveReserve();
  }, [selectedDate]);

  const dateString = `${selectedDate.getFullYear()}/${
    selectedDate.getMonth() + 1
  }/${selectedDate.getDate()}`;

  return (
    <div className="reservations-daily--date-switch-container">
      <div className='reservations-daily--date-switch-buttons'>
        <button
          className="reservations-daily--date-switch-button"
          onClick={onClickPrev}
        >
         前へ
        </button>
      </div>
        <div className="reservations-daily--date">{dateString}</div>
      <div className='reservations-daily--date-switch-buttons'>
        <button
          className="reservations-daily--date-switch-button"
          onClick={onClickNext}
        >
         次へ
        </button>
      </div>
    </div>
  );
};
