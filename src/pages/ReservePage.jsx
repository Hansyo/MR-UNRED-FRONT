import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './ReservePage.css';
import { format } from'date-fns'
import { Header } from '../components/common/Header/Header';
import { Calendar, Input } from '../components/reserve/Input';
import { postReserve } from '../apis/reserve';
import { getRooms } from '../apis/roomRequest';
import { RoomSelect } from '../components/reserve/RoomSelect.jsx'
//import Select from 'react-select';

const Repeat = {
  NO_REPEAT: 0,
  DAILY_TIME: 2,
  DAILY_DATE: 1,
  WEEKLY_TIME: 4,
  WEEKLY_DATE: 3,
};

const ReservePage = () => {
  const [reserverName, setReserverName] = useState('');
  const [guestName, setGuestName] = useState('');
  const [reserveDateFrom, setReserveDateFrom] = useState(new Date());
  const [reserveDateTo, setReserveDateTo] = useState(new Date());
  const [reserveTimeFrom, setReserveTimeFrom] = useState('00:00');
  const [reserveTimeTo, setReserveTimeTo] = useState('00:00');
  const [purpose, setPurpose] = useState('');
  const [guestDetail, setGuestDetail] = useState('');
  const [repitationType, setRepitationType] = useState(Repeat.NO_REPEAT);
  const [repitationNum, setRepitationNum] = useState(1);
  const [repitationFinishDate, setRepitationFinishDate] = useState(new Date());
  const [roomid, setRoomid] = useState('');
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const updateRoooms = async () => {
    const rooms = await getRooms();
    setRooms(rooms);
    setRoomid(rooms[0].id);
  }

  const sendReserve = async (e) => {
    e.preventDefault()
    const startDate = new Date(reserveDateFrom);
    const endDate = new Date(reserveDateTo);
    startDate.setHours(
      Number(reserveTimeFrom.slice(0, 2)),
      Number(reserveTimeFrom.slice(-2)),
      0,
      0,
    );
    endDate.setHours(
      Number(reserveTimeTo.slice(0, 2)),
      Number(reserveTimeTo.slice(-2)),
      0,
      0,
    );

    try {
      const response = await postReserve(
        roomid,
        startDate,
        endDate,
        reserverName,
        purpose,
        guestName,
        guestDetail,
        Math.ceil(repitationType / 2),
        (repitationType === Repeat.DAILY_TIME || repitationType === Repeat.MONTHLY_TIME) ? repitationNum : null,
        (repitationType === Repeat.DAILY_DATE || repitationType === Repeat.MONTHLY_DATE) ? format(repitationFinishDate, 'yyyy-MM-dd') : null,
      );
      navigate(`/reservations/${((Array.isArray(response)) ? response[0] : response).id}`);
    } catch (err) {
      alert(`保存に失敗しました：${err.message}`);
    }
  };
  
  //oneshot
  useEffect(() => updateRoooms(), []);

  //Room Name，電話番号，メールアドレスは自動で入る？
  return (
    <div>
      <Header />
      {/* 入力フォーム */}
      <div className="page">
        <form onSubmit={sendReserve}>
        {/* 部屋の名前 */}
        <div className="reserve--upper-grid">
          <RoomSelect rooms={rooms} setRoomid={setRoomid}/>
          <div>
            <button
              className="reserve-saveButton"
              type='submit'
            >
              保存
            </button>
          </div>
        </div>
        {/* <hr className="reserve-line"></hr> */}

        {/* 開始カレンダー選択 */}
        <div className="reserve--upper-calendar reserve-required">
        <div className="reserve--time-label">開始日付</div>
          <div className='reserve-time-selecter'>
            <Calendar value={reserveDateFrom} onChange={setReserveDateFrom} />
          </div>
          <div className="reserve--time-label">時間</div>
          <div>
            <input
              value={reserveTimeFrom}
              onChange={(e) => setReserveTimeFrom(e.target.value)}
              type="time"
              className="reserve-time"
              required
            />
          </div>
        </div>

        {/* 終了カレンダー選択 */}
        <div className="reserve--upper-calendar reserve-required">
        <div className="reserve--time-label">終了日付</div>
          <div>
            <Calendar value={reserveDateTo} onChange={setReserveDateTo} />
          </div>
          <div className="reserve--time-label">時間</div>
          <div>
            <input
              value={reserveTimeTo}
              onChange={(e) => setReserveTimeTo(e.target.value)}
              type="time"
              className="reserve-time"
              required
            />
          </div>
        </div>
      
        {/* 繰り返し予約選択 */}
        <div className="reserve--upper-DAY">
          <div className="ipselect">
            <select
              value={repitationType}
              onChange={(e) => setRepitationType(e.target.value)}
              className="SB"
              required
            >
              <option value={Repeat.NO_REPEAT}>繰り返さない</option>
              <option value={Repeat.DAILY_TIME}>毎日（回数指定）</option>
              <option value={Repeat.DAILY_DATE}>毎日（終了日付指定）</option>
              <option value={Repeat.WEEKLY_TIME}>毎週（回数指定）</option>
              <option value={Repeat.WEEKLY_DATE}>毎週（終了日付指定）</option>
            </select>
            <span className="SB_highlight"></span>
            <span className="SB_selectbar"></span>
          </div>
        </div>
        
          {/*繰り返し回数*/}
          {
            (repitationType === Repeat.DAILY_TIME || repitationType === Repeat.MONTHLY_TIME) &&
            (<div className="reserve--upper-calendar">
              <div className="reserve--time-label">繰り返し回数</div>
              <div>
                <input 
                  type="number" 
                  min={1}
                  value={repitationNum} 
                  onChange={(e) => setRepitationNum(e.target.value)}
                  className = "reserve-repeat-input"
                />
              </div>
            </div>)
          }

          {/* 繰り返し予約のカレンダー */}
          {
            (repitationType === Repeat.DAILY_DATE || repitationType === Repeat.MONTHLY_DATE) &&
            (<div className="reserve--upper-calendar">
            <div className="reserve--time-label">繰り返し終了日付</div>
              <div>
                <Calendar value={repitationFinishDate} onChange={setRepitationFinishDate}/>
              </div>
            </div>)
          }


        <div className="reserve--event-usertitle">
          <h2> 予約詳細</h2>
          <hr className="reserve-line"></hr>
          <br></br>
        </div>
      

        {/* 予約者情報入力 */}
        {/* <div className="reserve--event-grid"> */}
          {/* 教員用入力画面 */}
              <div className="flexbox">
                <div className="reserve--event-label reserve-required">
                  予約者名
                </div>
                <Input
                  value={reserverName}
                  onChange={setReserverName}
                  className="reserve--event-input"
                  placeholder="予約をした人の名前"
                />
              </div>


          {/* <div className="reserve--event-form"> */}
            <div className="flexbox">
              <div className="reserve--event-label reserve-required">利用者名・団体名</div>
              <Input
                value={guestName}
                onChange={setGuestName}
                className="reserve--event-input"
                placeholder="実際に使用する人・団体の名前"
              />
            </div>

              <div className="flexbox">
                <div className="reserve--event-label">利用者詳細</div>
                <textarea
                  value={guestDetail}
                  onChange={(e) => setGuestDetail(e.target.value)}
                  rows="3"
                  className="reserve--event-textarea"
                  placeholder="メールアドレス、電話番号など"
                />
              </div>
          {/* </div> */}
        {/* </div> */}
        {/* ゲスト用入力画面 */}
            <div className="flexbox">
              <div className="reserve--event-label">利用目的</div>
              <textarea
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                rows={3}
                className="reserve--event-textarea"
                placeholder="~の会議で使用するなど"
              />
            </div>
            <div className='reserve-under-saveButton'>
            <button
              className="reserve-saveButton"
              type='submit'
            >
              保存
            </button>
          </div>
            </form>
          </div>

        </div>
  );
};

export default ReservePage;
