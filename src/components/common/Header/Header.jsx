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
  const isReservePage = /^\/reserve\/?$/.test(pathname);

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
        <Link
          to="/admin/room"
          className={getLinkClassName(pathname, /^\/admin\/room/)}
        >
          部屋管理
        </Link>
        {/* TODO: ユーザー管理ページへのリンクを追加 */}
        <div className="header__flex-spacer" />
        {!isReservePage && (
          <Link className="header__reserve-btn" to="/reserve">
            会議室を予約
          </Link>
        )}
      </header>
    </div>
  );
};
