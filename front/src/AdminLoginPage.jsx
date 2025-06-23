import React, { useState } from 'react';
import { Settings } from 'lucide-react';

const AdminLoginPage = ({ onLogin, onBackToRoleSelection }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = () => {
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      onLogin({ username: 'admin', role: 'ADMIN' });
    } else {
      alert('Invalid credentials');
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #faf5ff 0%, #e0e7ff 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px'
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    padding: '32px',
    width: '100%',
    maxWidth: '400px'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '24px'
  };

  const iconStyle = {
    width: '48px',
    height: '48px',
    color: '#9333ea',
    margin: '0 auto 16px auto'
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#111827',
    margin: '0'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '4px'
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#9333ea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

  const backButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#6b7280',
    cursor: 'pointer',
    fontSize: '14px'
  };

  const centerStyle = {
    textAlign: 'center',
    marginTop: '16px'
  };

  const demoTextStyle = {
    textAlign: 'center',
    marginTop: '8px',
    fontSize: '12px',
    color: '#6b7280'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <Settings style={iconStyle} />
          <h2 style={titleStyle}>Admin Login</h2>
        </div>

        <div style={formStyle}>
          <div>
            <label style={labelStyle}>Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#9333ea'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#9333ea'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              required
            />
          </div>

          <button
            onClick={handleLogin}
            style={buttonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#7c3aed'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#9333ea'}
          >
            Login
          </button>
        </div>

        <div style={centerStyle}>
          <button
            onClick={onBackToRoleSelection}
            style={backButtonStyle}
          >
            Back to role selection
          </button>
        </div>
        
        <div style={demoTextStyle}>
          Demo: username: admin, password: admin
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;