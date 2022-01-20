import React, { useState } from 'react';

import './ReservePage.css';
import { Input } from '../components/reserve/Input';

const ReservePage = () => {
  const [phone, setPhone] = useState('');

  const onPhoneChange = (e) => {
    setPhone(e.target.value);
  };

  return (
    <div>
      <h1>This is ReservePage</h1>
      <div className="reserve--upper-grid">
        <div>
          <div>{phone}</div>
          <Input value={phone} onChange={onPhoneChange} />
        </div>
        <div>
          <button>送信</button>
        </div>
      </div>
    </div>
  );
};

export default ReservePage;
