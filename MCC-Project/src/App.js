import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Membership, EventsControll, Auth, EventDetail } from './pages';
import { getToken } from './services/api';
//testing
export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '18px' }}>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth onAuthSuccess={() => setIsAuthenticated(true)} />} />
        <Route path="/events" element={<EventsControll isAuthenticated={isAuthenticated} />} />
        <Route path="/event/:eventId" element={<EventDetail />} />
        {isAuthenticated && (
          <Route path="/membership" element={<Membership />} />
        )}
        <Route path="*" element={<Navigate to="/events" />} />
      </Routes>
    </Router>
  );
};