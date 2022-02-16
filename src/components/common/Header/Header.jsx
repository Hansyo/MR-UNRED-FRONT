import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

// activeRegExpは、リンク先のページのパスを判定する正規表現
// activeなとき、今そのページにいることがわかるように、リンクが強調される
const getLinkClassName = (pathname, activeRegExp) => {
  if (activeRegExp && activeRegExp.test(pathname)) {
    return 'header__link active';
  }
  return 'header__link';
};

export const Header = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <div className="header__spacer" />

      <header className="header">
        <div className="header__logo">3系会議室予約</div>
        <Link
          to="/reservations/weekly"
          className={getLinkClassName(pathname, /^\/reservations/)}
        >
          予約確認
        </Link>
        <Link to="/log" className={getLinkClassName(pathname, /^\/log/)}>
          予約履歴
        </Link>
        {/* TODO: 部屋管理ページへのリンクを追加 */}
        {/* TODO: ユーザー管理ページへのリンクを追加 */}
      </header>
    </div>
  );
};
