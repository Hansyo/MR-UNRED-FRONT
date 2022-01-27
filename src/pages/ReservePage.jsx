import React, { useState } from 'react';
import Datepicker from 'react-datepicker';
import TimePicker from 'react-time-picker';

import './ReservePage.css';
import { Calendar, Input, Selectbox, Icon } from '../components/reserve/Input';
//import Select from 'react-select';

const Repeat = {
  NO_REPEAT: 'NO',
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
};

const ReservePage = () => {
  const [reserveDate, setReserveDate] = useState(new Date());
  const [reserveTimeFrom, setReserveTimeFrom] = useState('00:00');
  const [reserveTimeTo, setReserveTimeTo] = useState('00:00');
  const [shouldReserveAllDay, setShouldReserveAllDay] = useState(false);
  const [reserveRepeat, setReserveRepeat] = useState(Repeat.NO_REPEAT);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [description, setDescription] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');

  const sendReserve = () => {
    console.log({
      reserveDate,
      reserveTimeFrom,
      reserveTimeTo,
      shouldReserveAllDay,
      reserveRepeat,
      userName,
      userPhone,
      userEmail,
      description,
      guestName,
      guestPhone,
      guestEmail,
    });
  };

  //Room Name，電話番号，メールアドレスは自動で入る？
  return (
    // 入力フォーム
    <div>
      {/* 部屋の名前 */}
      <div className="reserve--upper-grid">
        <h1>Room Name</h1>
        <div>
          <button
            class="reserve-saveButton reserve-saveButton--red"
            onClick={sendReserve}
          >
            SAVE
          </button>
        </div>
      </div>
      <hr className="reserve-line"></hr>

      {/* カレンダー選択 */}
      <div className="reserve--upper-calendar">
        <div>
          <Calendar value={reserveDate} onChange={setReserveDate} />
        </div>
        <div>
          <input type="time" className="reserve-time" required></input>
        </div> 
        <div>
          <input type="time" className="reserve-time" required></input>
          <input
            value={reserveTimeFrom}
            onChange={(e) => setReserveTimeFrom(e.target.value)}
            type="time"
            class="reserve-time"
            required
          />
        </div>

        <div>
          <input
            value={reserveTimeTo}
            onChange={(e) => setReserveTimeTo(e.target.value)}
            type="time"
            class="reserve-time"
            required
          />
        </div>
      </div>

      {/* DAYChoose */}
      <div className="reserve--upper-DAY">
        <label className="ECM_CheckboxInput">
          <input className="ECM_CheckboxInput-Input" type="checkbox"></input><span class="ECM_CheckboxInput-DummyInput"></span><span class="ECM_CheckboxInput-LabelText">ALL DAY</span>
        </label>
        {/* <div className="ipselect">
          <select className="SB" required></select>
          <option value="" hidden disabled selected></option>
          <option value="1">daily</option>
          <option value="2">weekly</option>
          <option value="3">monthly</option>
          <label class="ECM_CheckboxInput">
            <input
              value={shouldReserveAllDay}
              onChange={(e) => setShouldReserveAllDay(e.target.checked)}
              class="ECM_CheckboxInput-Input"
              type="checkbox"
            />
           <span class="ECM_CheckboxInput-DummyInput"></span>
            <span class="ECM_CheckboxInput-LabelText">ALL DAY</span>
          </label> */}
          <div class="ipselect">
            <select
              value={reserveRepeat}
              onChange={(e) => setReserveRepeat(e.target.value)}
              class="SB"
              required
            >
              <option value={Repeat.NO_REPEAT} hidden disabled selected></option>
              <option value={Repeat.DAILY}>daily</option>
              <option value={Repeat.WEEKLY}>weekly</option>
              <option value={Repeat.MONTHLY}>monthly</option>
            </select>
            <span className="SB_highlight"></span>
            <span className="SB_selectbar"></span>
            <label className="SB_selectlabel">Choose</label>
          </div>
        
      </div>

      {/* 予約者情報入力 */}
      <div className="reserve--event-grid">
        {/* 教員用入力画面 */}
        <div className='reserve--event-user'>
          <div className='reserve--event-usertitle'>
            <h1> Event Details</h1> 
            <hr className='reserve-line'></hr><br></br>
          </div>

          <div className='reserve--event-form'>
            <Icon index={0} />
            <div className="flexbox">
              <a>User Name</a>
              <Input className="reserve--event-input" placeholder="User Name" />
            </div>
          </div>

          <div className='reserve--event-form'>
            <Icon index={1} />
            <div className="flexbox">
              <a>Phone Number</a>
              <Input className="reserve--event-input" placeholder="012-3456-7890" />
            </div>
          </div>

          <div className='reserve--event-form'>
          <Icon index={2} />
          <div className="flexbox">
            <a>E-Mail</a>
            <Input className="reserve--event-input" placeholder="info@example.com" />
          </div>
          </div>

          <div className='reserve--event-form'>
          <Icon index={3} />
          <div className="flexbox">
            <a>Purpose and Description</a>
            <Input className="reserve--event-input" placeholder="Add purpose and description" />
          </div>
          </div>
        
        </div> 
        {/* ゲスト用入力画面 */}
        <div className='reserve--event-guest'>
          <div className='reserve--event-usertitle'>
            <h1> Guest Details</h1> 
            <hr className='reserve-line'></hr><br></br>
          </div>
          <div className='reserve--event-form'>
            <div className="flexbox">
              <a>detailed information</a>
              <Input type="text" className="reserve--event-input-typetext" placeholder="補足" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReservePage;
