import React from 'react';
import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">3系会議室予約</div>
      <a href="/reservations/weekly" className="header__link active">
        予約確認
      </a>
      <a href="#TODO" className="header__link">
        予約履歴
      </a>
    </header>
  );
};
