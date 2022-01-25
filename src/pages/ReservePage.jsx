import React, { useState } from 'react';
import Datepicker from "react-datepicker";
import TimePicker from 'react-time-picker';

import './ReservePage.css';
import { Calendar, Input, Selectbox, Icon } from '../components/reserve/Input';
//import Select from 'react-select';

const ReservePage = () => {
  const [phone, setPhone] = useState('');
  const [initDate, setDate] = useState(new Date());
  //const [initRepeat, setRepeat] = useState('');
  /*
  const onPhoneChange = (e) => {
    setPhone(e.target.value);
    <div>
          <div>{phone}</div>
          <Input value={phone} onChange={onPhoneChange} />
        </div>
  };*/

  const onDateChange = (date) => {
    setDate(date);
  };
  /*
  const onRepeatChange = (repeat) => {
    setRepeat(repeat);
  };*/



  //Room Name，電話番号，メールアドレスは自動で入る？
  return (
  
    <div>
      <div className="reserve--upper-grid">
      <h1>Room Name</h1>
        <div>
          <button type="submit" className="reserve-saveButton">Save</button>
        </div>
      </div>
      <hr className='reserve-line'></hr>
      <div className="reserve--upper-grid">
        <div>
          <Calendar value={initDate} onChange={onDateChange} />
        </div>
        <div>
          <input type="time" class="reserve-time" required></input>
        </div>
        ー
        <div>
          <input type="time" class="reserve-time" required></input>
        </div>
      </div> 
      <div className="reserve--upper-grid">
        <input id="allDayTag" value="1" type="checkbox" /><label for="allDayTag"> All Day </label>
        <div> <Selectbox /></div>
      </div>
      <div> 
        <div className="reserve--event-grid"><h1> Event Details</h1> <h1 className="reserve--guest-grid">Guests Details</h1></div>
        <hr className='reserve-line'></hr><br></br>
      </div>
      <div>
        <div className='reserve--event-grid'>
          <Icon index={0} />
          <Input className="reserve--event-input" placeholder="User Name" />
          <Input className="reserve--guest-input" placeholder="User Name"/>
        </div>
      </div>
      <div>
        <div className='reserve--event-grid'>
          <Icon index={1} />
          <Input className="reserve--event-input" placeholder="090-1234-5678" />
          <Input className="reserve--guest-input" placeholder="090-1234-5678"/>
        </div>
      </div>
      <div className='reserve--event-grid'>
          <Icon index={2} />
        <Input className="reserve--event-input" placeholder="info@example.com" />
        <Input className="reserve--guest-input" placeholder="info@example.com"/>
      </div>
        <div className='reserve--event-grid'>
          <Icon index={3} />
          <Input className="reserve--event-input" placeholder="Add purpose and description" />
      </div>
    </div>
  );
};

export default ReservePage;
