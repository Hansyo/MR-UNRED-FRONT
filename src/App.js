import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import TopPage from './pages/TopPage';
import ReservePage from './pages/ReservePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/reserve" element={<ReservePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
