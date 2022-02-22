import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import './App.css';
import TopPage from './pages/TopPage';
import ReservePage from './pages/ReservePage';
import ReservationsDailyPage from './pages/ReservationsDailyPage';
import ReservationsMonthlyPage from './pages/ReservationsMonthlyPage';
import ReservationsWeeklyPage from './pages/ReservationsWeeklyPage';
import ReservationDetailPage from './pages/ReservationDetailPage';
import ReservationLogPage from './pages/ReservationLogPage';
import RoomManagementPage from './pages/RoomManagementPage';

const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
});

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL} history={history}>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/reserve" element={<ReservePage />} />
        <Route path="/reservations/daily" element={<ReservationsDailyPage />} />
        <Route
          path="/reservations/monthly"
          element={<ReservationsMonthlyPage />}
        />
        <Route
          path="/reservations/weekly"
          element={<ReservationsWeeklyPage />}
        />
        <Route
          path="/reservations/:reservationId"
          element={<ReservationDetailPage />}
        />
        <Route path="/log" element={<ReservationLogPage />} />
        <Route path="/admin/room" element={<RoomManagementPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
