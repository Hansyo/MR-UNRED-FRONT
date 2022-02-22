import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/common/Header';

const TopPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/reservations/weekly', { replace: true });
  }, [navigate]);

  return (
    <div>
      <Header />
    </div>
  );
};

export default TopPage;
