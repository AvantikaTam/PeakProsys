import React from 'react';
import { User, GraduationCap, BookOpen, Settings } from 'lucide-react';

const RoleSelectionPage = ({ onRoleSelect }) => {
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)',
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
    marginBottom: '32px'
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#111827',
    margin: '16px 0 8px 0'
  };

  const subtitleStyle = {
    color: '#6b7280',
    margin: '0'
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  const buttonStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    border: '2px solid',
    borderRadius: '8px',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none'
  };

  const studentButtonStyle = {
    ...buttonStyle,
    borderColor: '#bfdbfe',
    '&:hover': {
      borderColor: '#60a5fa',
      backgroundColor: '#eff6ff'
    }
  };

  const tutorButtonStyle = {
    ...buttonStyle,
    borderColor: '#bbf7d0',
    '&:hover': {
      borderColor: '#4ade80',
      backgroundColor: '#f0fdf4'
    }
  };

  const adminButtonStyle = {
    ...buttonStyle,
    borderColor: '#e9d5ff',
    '&:hover': {
      borderColor: '#a855f7',
      backgroundColor: '#faf5ff'
    }
  };

  const iconStyle = {
    width: '24px',
    height: '24px',
    marginRight: '12px'
  };

  const buttonTextStyle = {
    fontSize: '18px',
    fontWeight: '500',
    color: '#374151'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <GraduationCap style={{ ...iconStyle, width: '48px', height: '48px', color: '#4f46e5', margin: '0 auto 16px auto' }} />
          <h1 style={titleStyle}>Achievers Academy</h1>
          <p style={subtitleStyle}>Select your role to continue</p>
        </div>
        
        <div style={buttonContainerStyle}>
          <button
            onClick={() => onRoleSelect('STUDENT')}
            style={studentButtonStyle}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#60a5fa';
              e.target.style.backgroundColor = '#eff6ff';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#bfdbfe';
              e.target.style.backgroundColor = 'white';
            }}
          >
            <User style={{ ...iconStyle, color: '#2563eb' }} />
            <span style={buttonTextStyle}>Student</span>
          </button>
          
          <button
            onClick={() => onRoleSelect('TUTOR')}
            style={tutorButtonStyle}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#4ade80';
              e.target.style.backgroundColor = '#f0fdf4';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#bbf7d0';
              e.target.style.backgroundColor = 'white';
            }}
          >
            <BookOpen style={{ ...iconStyle, color: '#16a34a' }} />
            <span style={buttonTextStyle}>Tutor</span>
          </button>
          
          <button
            onClick={() => onRoleSelect('ADMIN')}
            style={adminButtonStyle}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#a855f7';
              e.target.style.backgroundColor = '#faf5ff';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#e9d5ff';
              e.target.style.backgroundColor = 'white';
            }}
          >
            <Settings style={{ ...iconStyle, color: '#9333ea' }} />
            <span style={buttonTextStyle}>Admin</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;