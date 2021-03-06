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
        (repitationType === Repeat.DAILY_TIME || repitationType === Repeat.WEEKLY_TIME) ? repitationNum : null,
        (repitationType === Repeat.DAILY_DATE || repitationType === Repeat.WEEKLY_DATE) ? format(repitationFinishDate, 'yyyy-MM-dd') : null,
      );
      navigate(`/reservations/${((Array.isArray(response)) ? response[0] : response).id}`);
    } catch (err) {
      alert(`??????????????????????????????${err.message}`);
    }
  };
  
  //oneshot
  useEffect(() => updateRoooms(), []);
  
  //Room Name????????????????????????????????????????????????????????????
  return (
    <div>
      <Header />
      {/* ?????????????????? */}
      <div className="page">
        <form onSubmit={sendReserve}>
        {/* ??????????????? */}
        <div className="reserve--upper-grid">
          <RoomSelect rooms={rooms} setRoomid={setRoomid}/>
          <div>
            <button
              className="reserve-saveButton"
              type='submit'
            >
              ??????
            </button>
          </div>
        </div>
        {/* <hr className="reserve-line"></hr> */}

        {/* ??????????????????????????? */}
        <div className="reserve--upper-calendar reserve-required">
        <div className="reserve--time-label">????????????</div>
          <div className='reserve-time-selecter'>
            <Calendar value={reserveDateFrom} onChange={setReserveDateFrom} />
          </div>
          <div className="reserve--time-label">??????</div>
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

        {/* ??????????????????????????? */}
        <div className="reserve--upper-calendar reserve-required">
        <div className="reserve--time-label">????????????</div>
          <div>
            <Calendar value={reserveDateTo} onChange={setReserveDateTo} />
          </div>
          <div className="reserve--time-label">??????</div>
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
      
        {/* ???????????????????????? */}
        <div className="reserve--upper-DAY">
          <div className="ipselect">
            <select
              value={repitationType}
              onChange={(e) => setRepitationType(Number(e.target.value))}
              className="SB"
              required
            >
              <option value={Repeat.NO_REPEAT}>??????????????????</option>
              <option value={Repeat.DAILY_TIME}>????????????????????????</option>
              <option value={Repeat.DAILY_DATE}>??????????????????????????????</option>
              <option value={Repeat.WEEKLY_TIME}>????????????????????????</option>
              <option value={Repeat.WEEKLY_DATE}>??????????????????????????????</option>
            </select>
            <span className="SB_highlight"></span>
            <span className="SB_selectbar"></span>
          </div>

        
          {/*??????????????????*/}
          {
            (repitationType === Repeat.DAILY_TIME || repitationType === Repeat.WEEKLY_TIME) &&
            (<div className="reserve--upper-calendar reserve-required">
              <div className="reserve--time-label">??????????????????</div>
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

          {/* ???????????????????????????????????? */}
          {
            (repitationType === Repeat.DAILY_DATE || repitationType === Repeat.WEEKLY_DATE) &&
            (<div className="reserve--upper-calendar reserve-required">
            <div className="reserve--time-label">????????????????????????</div>
              <div>
                <Calendar value={repitationFinishDate} onChange={setRepitationFinishDate}/>
              </div>
            </div>)
          }
        </div>

        <div className="reserve--event-usertitle">
          <h2> ????????????</h2>
          <hr className="reserve-line"></hr>
          <br></br>
        </div>

        {/* ????????????????????? */}
        {/* <div className="reserve--event-grid"> */}
          {/* ????????????????????? */}
              <div className="flexbox">
                <div className="reserve--event-label reserve-required">
                  ????????????
                </div>
                <Input
                  value={reserverName}
                  onChange={setReserverName}
                  className="reserve--event-input"
                  placeholder="???????????????????????????"
                />
              </div>


          {/* <div className="reserve--event-form"> */}
            <div className="flexbox">
              <div className="reserve--event-label reserve-required">????????????????????????</div>
              <Input
                value={guestName}
                onChange={setGuestName}
                className="reserve--event-input"
                placeholder="??????????????????????????????????????????"
              />
            </div>

              <div className="flexbox">
                <div className="reserve--event-label">???????????????</div>
                <textarea
                  value={guestDetail}
                  onChange={(e) => setGuestDetail(e.target.value)}
                  rows="3"
                  className="reserve--event-textarea"
                  placeholder="??????????????????????????????????????????"
                />
              </div>
          {/* </div> */}
        {/* </div> */}
        {/* ???????????????????????? */}
            <div className="flexbox">
              <div className="reserve--event-label">????????????</div>
              <textarea
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                rows={3}
                className="reserve--event-textarea"
                placeholder="~??????????????????????????????"
              />
            </div>
            <div className='reserve-under-saveButton'>
            <button
              className="reserve-saveButton"
              type='submit'
            >
              ??????
            </button>
          </div>
            </form>
          </div>

        </div>
  );
};

export default ReservePage;
