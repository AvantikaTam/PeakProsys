import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { checkAuth, logout } from './auth';
import Auth from './components/Auth';
import Admin from './components/Admin';
import Tutor from './components/Tutor';
import Student from './components/Student';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const userData = await checkAuth();
      setUser(userData);
      setLoading(false);
    };
    verifyAuth();
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  if (loading) return <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontSize: '24px'
  }}>Loading...</div>;

  return (
    <Router>
      {user && (
        <nav style={{
          background: '#2d3748',
          padding: '15px',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontWeight: 'bold' }}>Achievers Academy - {user.role}</span>
          <button 
            onClick={handleLogout}
            style={{
              background: '#e53e3e',
              color: 'white',
              border: 'none',
              padding: '8px 15px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </nav>
      )}
      <Routes>
        <Route path="/" element={user ? <Navigate to={`/${user.role.toLowerCase()}`} /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={!user ? <Auth setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/admin" element={user?.role === 'ADMIN' ? <Admin user={user} /> : <Navigate to="/" />} />
        <Route path="/tutor" element={user?.role === 'TUTOR' ? <Tutor user={user} /> : <Navigate to="/" />} />
        <Route path="/student" element={user?.role === 'STUDENT' ? <Student user={user} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;