import { React, useEffect } from 'react';
import { getReserve } from '../../../apis/getReservation';
import './DateSwitcher.css';
const UTCTOJST = 9;

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
  
  const receiveReserve = () => {
    const roomTotal = 6;
    const roomNames = ["会議室1","会議室2","会議室3","会議室4","会議室5","会議室6"];
    let roomId = '';
    let getReserveData;
    const items = [];
    const startDateTime = new Date(selectedDate);
    const endDateTime = new Date(selectedDate);
    startDateTime.setHours(0+UTCTOJST, 0, 0, 0);
    endDateTime.setHours(23+UTCTOJST, 59, 59, 0);
    
    /* コンパクトにしたい */
    for (let i = 1; i <= roomTotal; i++) {
      roomId = String(i);
      getReserveData = JSON.parse(JSON.stringify(getReserve(
        startDateTime,
        endDateTime,
        roomId,
      )));
      if (Object.keys(getReserveData).length) {
        items.push({
          id: i,
          name: roomNames[i - 1],
          reservations: [
            getReserveData
          ],
        });
      }
      else {
        items.push({
          id: i,
          name: roomNames[i - 1],
          reservations: [
          ],
        });
      }
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
