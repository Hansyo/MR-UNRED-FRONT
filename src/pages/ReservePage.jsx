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
  const [description, setDescription] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestDetail, setGuestDetail] = useState('');

  const sendReserve = () => {
    console.log({
      reserveDate,
      reserveTimeFrom,
      reserveTimeTo,
      shouldReserveAllDay,
      reserveRepeat,
      userName,
      description,
      guestName,
      guestDetail,
    });
  };

  //Room Name，電話番号，メールアドレスは自動で入る？
  return (
    // 入力フォーム
    <div className="page">
      {/* 部屋の名前 */}
      <div className="reserve--upper-grid">
        <b>会議室の名前</b>
        <div>
          <button
            class="reserve-saveButton reserve-saveButton--red"
            onClick={sendReserve}
          >
            保存
          </button>
        </div>
      </div>
      <hr className="reserve-line"></hr>

      {/* カレンダー選択 */}
      <div className="reserve--upper-calendar">
        <h4>日時</h4>
        <div>
          <Calendar value={reserveDate} onChange={setReserveDate} />
        </div>
        <h4>開始時間</h4>
        <div>
          <input
            value={reserveTimeFrom}
            onChange={(e) => setReserveTimeFrom(e.target.value)}
            type="time"
            className="reserve-time"
            required
          />
        </div>
        <h4>終了時間</h4>
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

      {/* 終日選択 */}
      <div className="reserve--upper-DAY">
        <label className="ECM_CheckboxInput">
          <input
            value={shouldReserveAllDay}
            onChange={(e) => setShouldReserveAllDay(e.target.checked)}
            className="ECM_CheckboxInput-Input"
            type="checkbox"
          ></input>
          <span class="ECM_CheckboxInput-DummyInput"></span>
          <span class="ECM_CheckboxInput-LabelText">終日</span>
        </label>
        <div class="ipselect">
          <select
            value={reserveRepeat}
            onChange={(e) => setReserveRepeat(e.target.value)}
            class="SB"
            required
          >
            <option value={Repeat.NO_REPEAT}>繰り返さない</option>
            <option value={Repeat.DAILY}>毎日</option>
            <option value={Repeat.WEEKLY}>毎週</option>
            <option value={Repeat.MONTHLY}>毎月</option>
          </select>
          <span className="SB_highlight"></span>
          <span className="SB_selectbar"></span>
        </div>
      </div>

      <div className="reserve--event-usertitle">
        <h2> 予約詳細</h2>
        <hr className="reserve-line"></hr>
        <br></br>
      </div>

      {/* 予約者情報入力 */}
      <div className="reserve--event-grid">
        {/* 教員用入力画面 */}
        <div className="reserve--event-user">
          <div className="reserve--event-form">
            <div className="flexbox">
              <a>予約者名</a>
              <Input
                value={userName}
                onChange={setUserName}
                className="reserve--event-input"
                placeholder="予約をした人の名前"
              />
            </div>
          </div>

          <div className="reserve--event-form">
            <div className="flexbox">
              <a>利用者名・団体名</a>
              <Input
                value={guestName}
                onChange={setGuestName}
                className="reserve--event-input"
                placeholder="実際に使用する人・団体の名前"
              />
            </div>
          </div>

          <div className="reserve--event-form">
            <div className="flexbox">
              <a>利用者詳細</a>
              <textarea
                value={guestDetail}
                onChange={setGuestDetail}
                rows="8"
                className="reserve--event-textarea"
                placeholder="メールアドレス,電話番号など"
              />
            </div>
          </div>
        </div>
        {/* ゲスト用入力画面 */}
        <div className="reserve--event-guest">
          <div className="reserve--event-form">
            <div className="flexbox">
              <a>利用目的</a>
              <textarea
                value={description}
                onChange={setDescription}
                rows={10}
                className="reserve--event-guesttextarea"
                placeholder="~の会議で使用するなど"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservePage;
