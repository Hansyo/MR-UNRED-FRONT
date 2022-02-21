import React, { useState } from 'react';

import './ReservePage.css';
import { Header } from '../components/common/Header/Header';
import { Calendar, Input } from '../components/reserve/Input';
import { postReserve } from '../apis/reserve';
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
  const [reserveRepeat, setReserveRepeat] = useState(Repeat.NO_REPEAT);
  const [reserverName, setReserverName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestDetail, setGuestDetail] = useState('');

  const sendReserve = async () => {
    const startDate = new Date(reserveDate);
    const endDate = new Date(reserveDate);
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
      await postReserve(
        startDate,
        endDate,
        reserverName,
        purpose,
        guestName,
        guestDetail,
      );
    } catch (err) {
      alert(`保存に失敗しました：${err.message}`);
    }
  };

  //Room Name，電話番号，メールアドレスは自動で入る？
  return (
    <div>
      <Header />
      {/* 入力フォーム */}
      <div className="page">
        {/* 部屋の名前 */}
        <div className="reserve--upper-grid">
          <div className="reserve--upper-grid-roomname">
            <b>会議室の名前</b>
          </div>
          <div>
            <button
              className="reserve-saveButton"
              onClick={sendReserve}
            >
              保存
            </button>
          </div>
        </div>
        {/* <hr className="reserve-line"></hr> */}

        {/* カレンダー選択 */}
        <div className="reserve--upper-calendar">
          <div className="reserve--time-label">日時</div>
          <div>
            <Calendar value={reserveDate} onChange={setReserveDate} />
          </div>
          <div className="reserve--time-label">開始時間</div>
          <div>
            <input
              value={reserveTimeFrom}
              onChange={(e) => setReserveTimeFrom(e.target.value)}
              type="time"
              className="reserve-time"
              required
            />
          </div>
          <div className="reserve--time-label">終了時間</div>
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

        {/* 終日選択 */}
        <div className="reserve--upper-DAY">
          <div className="ipselect">
            <select
              value={reserveRepeat}
              onChange={(e) => setReserveRepeat(e.target.value)}
              className="SB"
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

        
          {/*繰り返し回数*/}
          {
            (repitationType % 2 == 0 && repitationType != 0) &&
            (<div className="reserve--upper-num">
              <div className="reserve--num-label">繰り返し回数</div>
              <div>
                <input type="number" value={repitationNum} onChange={(e) => setRepitationNum(e.target.value)}></input>
              </div>
            </div>)
          }

          {/* 繰り返し予約のカレンダー */}
          {
            (repitationType %2 == 1) &&
            (<div className="reserve--upper-calendar">
            <div className="reserve--time-label">繰り返し終了日付</div>
              <div>
                <Calendar value={repitationFinishDate} onChange={setRepitationFinishDate}/>
              </div>
            </div>)
          }
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
                <div className="reserve--event-label">
                  予約者名<c>*</c>
                </div>
                <Input
                  value={reserverName}
                  onChange={setReserverName}
                  className="reserve--event-input"
                  placeholder="予約をした人の名前"
                />
              </div>
            </div>

            <div className="reserve--event-form">
              <div className="flexbox">
                <div className="reserve--event-label">利用者名・団体名</div>
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
                <div className="reserve--event-label">利用者詳細</div>
                <textarea
                  value={guestDetail}
                  onChange={(e) => setGuestDetail(e.target.value)}
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
                <div className="reserve--event-label">
                  利用目的<c>*</c>
                </div>
                <textarea
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  rows={10}
                  className="reserve--event-guesttextarea"
                  placeholder="~の会議で使用するなど"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservePage;
