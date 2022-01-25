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
        <label class="ECM_CheckboxInput">
          <input
            value={shouldReserveAllDay}
            onChange={(e) => setShouldReserveAllDay(e.target.checked)}
            class="ECM_CheckboxInput-Input"
            type="checkbox"
          />
          <span class="ECM_CheckboxInput-DummyInput"></span>
          <span class="ECM_CheckboxInput-LabelText">ALL DAY</span>
        </label>
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
          <span class="SB_highlight"></span>
          <span class="SB_selectbar"></span>
          <label class="SB_selectlabel">Choose</label>
        </div>
      </div>

      <div>
        <div className="reserve--event-grid">
          <h1> Event Details</h1>{' '}
          <h1 className="reserve--guest-grid">Guests Details</h1>
        </div>
        <hr className="reserve-line"></hr>
        <br></br>
      </div>
      <div>
        <div className="reserve--event-grid">
          <Icon index={0} />
          <div class="flexbox">
            <a>User Name</a>
            <Input
              value={userName}
              onChange={setUserName}
              className="reserve--event-input"
              placeholder="User Name"
            />
          </div>
          <div class="flexbox">
            <a>Guest Name</a>
            <Input
              value={guestName}
              onChange={setGuestName}
              className="reserve--guest-input"
              placeholder="User Name"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="reserve--event-grid">
          <Icon index={1} />
          <div class="flexbox">
            <a>Phone Number</a>
            <Input
              value={userPhone}
              onChange={setUserPhone}
              className="reserve--event-input"
              placeholder="090-1234-5678"
            />
          </div>
          <div class="flexbox">
            <a>Guest Number</a>
            <Input
              value={guestPhone}
              onChange={setGuestPhone}
              className="reserve--guest-input"
              placeholder="090-1234-5678"
            />
          </div>
        </div>
      </div>

      <div className="reserve--event-grid">
        <Icon index={2} />
        <div class="flexbox">
          <a>E-Mail</a>
          <Input
            value={userEmail}
            onChange={setUserEmail}
            className="reserve--event-input"
            placeholder="info@example.com"
          />
        </div>
        <div class="flexbox">
          <a>Guest E-Mail</a>
          <Input
            value={guestEmail}
            onChange={setGuestEmail}
            className="reserve--guest-input"
            placeholder="info@example.com"
          />
        </div>
      </div>

      <div className="reserve--event-grid">
        <Icon index={3} />
        <div class="flexbox">
          <a>Purpose and Description</a>
          <Input
            value={description}
            onChange={setDescription}
            className="reserve--event-input"
            placeholder="Add purpose and description"
          />
        </div>
      </div>
    </div>
  );
};

export default ReservePage;
