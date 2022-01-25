import React from 'react';
import './Input.css';
import Document from '../icons/document.png';
import Mail from '../icons/mail.png';
import Person from '../icons/person.png';
import Phone from '../icons/phone.png';
import Select from 'react-select';
import DatePicker, { registerLocale } from 'react-datepicker';
import ja from 'date-fns/locale/ja';
import 'react-datepicker/dist/react-datepicker.css';

const initialDate = new Date();
registerLocale('ja', ja);

export const Input = ({ value, onChange, className, placeholder }) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
      placeholder={placeholder}
    />
  );
};

export const Calendar = ({ value, onChange }) => {
  return (
    <DatePicker
      className="reserve-date"
      dateFormat="yyyy/MM/dd"
      timeFormat="HH:mm"
      locale="ja"
      selected={value}
      minDate={initialDate}
      onChange={onChange}
    />
  );
};

export const Selectbox = () => {
  const options = [
    { value: 'repeat', label: 'Does not repeat' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
  ];

  return <Select options={options} />;
};

export const Icon = ({ index }) => {
  const icons = [Person, Phone, Mail, Document];

  return <img src={icons[index]} className="reserve-icon" alt="icon" />;
};
