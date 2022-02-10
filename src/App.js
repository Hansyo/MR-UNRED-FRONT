import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import TopPage from './pages/TopPage';
import ReservePage from './pages/ReservePage';
import ReservationsDailyPage from './pages/ReservationsDailyPage';
import ReservationsMonthlyPage from './pages/ReservationsMonthlyPage';
import ReservationDetailPage from './pages/ReservationDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/reserve" element={<ReservePage />} />
        <Route path="/reservations/daily" element={<ReservationsDailyPage />} />
        <Route
          path="/reservations/monthly"
          element={<ReservationsMonthlyPage />}
        />
        <Route
          path="/reservations/:reservationId"
          element={<ReservationDetailPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
