import React from 'react';
import './Input.css';

//333
export const Input = ({ value, onChange }) => {
  return <input className="reserve-input" value={value} onChange={onChange} />;
};
