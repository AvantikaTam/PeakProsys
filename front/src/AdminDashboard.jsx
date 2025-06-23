import React, { useState } from 'react';
import { GraduationCap, User, BookOpen, UserCheck, Users, Calendar } from 'lucide-react';

const AdminDashboard = ({ 
  currentUser, 
  pendingRequests, 
  approvedStudents, 
  approvedTutors, 
  onApproval, 
  onLogout 
}) => {
  const [activeTab, setActiveTab] = useState('pending');

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f9fafb'
  };

  const navStyle = {
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid #e5e7eb'
  };

  const navContentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 16px',
    display: 'flex',
    justifyContent: 'space-between',
    height: '64px',
    alignItems: 'center'
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center'
  };

  const logoTextStyle = {
    marginLeft: '8px',
    fontSize: '20px',
    fontWeight: '600',
    color: '#111827'
  };

  const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  };

  const welcomeTextStyle = {
    fontSize: '14px',
    color: '#6b7280'
  };

  const logoutButtonStyle = {
    fontSize: '14px',
    color: '#6b7280',
    background: 'none',
    border: 'none',
    cursor: 'pointer'
  };

  const mainContentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 16px'
  };

  const tabContainerStyle = {
    display: 'flex',
    backgroundColor: '#f3f4f6',
    padding: '4px',
    borderRadius: '8px',
    marginBottom: '32px',
    gap: '4px',
    flexWrap: 'wrap'
  };

  const tabButtonStyle = {
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const activeTabStyle = {
    ...tabButtonStyle,
    backgroundColor: 'white',
    color: '#111827',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  };

  const inactiveTabStyle = {
    ...tabButtonStyle,
    backgroundColor: 'transparent',
    color: '#6b7280'
  };

  const contentAreaStyle = {
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    padding: '24px'
  };

  const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '16px'
  };

  const noDataStyle = {
    color: '#6b7280',
    fontStyle: 'italic'
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginBottom: '16px'
  };

  const cardHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  };

  const cardTitleStyle = {
    fontWeight: '500',
    color: '#111827',
    marginBottom: '8px'
  };

  const cardTextStyle = {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '4px'
  };

  const approveButtonStyle = {
    backgroundColor: '#16a34a',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: '500'
  };

  const gridStyle = {
    display: 'grid',
    gap: '16px'
  };

  const renderPendingRequests = () => (
    <div>
      <h3 style={sectionTitleStyle}>Pending Approval Requests</h3>
      {pendingRequests.length === 0 ? (
        <p style={noDataStyle}>No pending requests</p>
      ) : (
        pendingRequests.map((user) => (
          <div key={user.id} style={cardStyle}>
            <div style={cardHeaderStyle}>
              <div>
                <h4 style={cardTitleStyle}>{user.name}</h4>
                <p style={cardTextStyle}>Role: {user.role}</p>
                <p style={cardTextStyle}>Username: {user.username}</p>
                <p style={cardTextStyle}>Phone: {user.phone}</p>
                {user.role === 'STUDENT' && (
                  <>
                    <p style={cardTextStyle}>Class: {user.className}</p>
                    <p style={cardTextStyle}>Parent: {user.parentName}</p>
                  </>
                )}
                {user.role === 'TUTOR' && (
                  <>
                    <p style={cardTextStyle}>Subject: {user.subject}</p>
                    <p style={cardTextStyle}>Experience: {user.experienceYears} years</p>
                  </>
                )}
              </div>
              <button
                onClick={() => onApproval(user.id, user.role)}
                style={approveButtonStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#15803d'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#16a34a'}
              >
                Approve
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderApprovedUsers = (users, title) => (
    <div>
      <h3 style={sectionTitleStyle}>{title}</h3>
      {users.length === 0 ? (
        <p style={noDataStyle}>No {title.toLowerCase()} found</p>
      ) : (
        <div style={gridStyle}>
          {users.map((user) => (
            <div key={user.id} style={cardStyle}>
              <h4 style={cardTitleStyle}>{user.name}</h4>
              <p style={cardTextStyle}>Username: {user.username}</p>
              <p style={cardTextStyle}>Phone: {user.phone}</p>
              {user.className && <p style={cardTextStyle}>Class: {user.className}</p>}
              {user.subject && <p style={cardTextStyle}>Subject: {user.subject}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderPlaceholderContent = (title, message) => (
    <div>
      <h3 style={sectionTitleStyle}>{title}</h3>
      <p style={noDataStyle}>{message}</p>
    </div>
  );

  return (
    <div style={containerStyle}>
      <nav style={navStyle}>
        <div style={navContentStyle}>
          <div style={logoStyle}>
            <GraduationCap style={{ width: '32px', height: '32px', color: '#4f46e5' }} />
            <span style={logoTextStyle}>Admin Dashboard</span>
          </div>
          <div style={userInfoStyle}>
            <span style={welcomeTextStyle}>Welcome, {currentUser.username}</span>
            <button
              onClick={onLogout}
              style={logoutButtonStyle}
              onMouseEnter={(e) => e.target.style.color = '#111827'}
              onMouseLeave={(e) => e.target.style.color = '#6b7280'}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div style={mainContentStyle}>
        <div style={tabContainerStyle}>
          <button
            onClick={() => setActiveTab('pending')}
            style={activeTab === 'pending' ? activeTabStyle : inactiveTabStyle}
            onMouseEnter={(e) => {
              if (activeTab !== 'pending') e.target.style.color = '#111827';
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'pending') e.target.style.color = '#6b7280';
            }}
          >
            <UserCheck style={{ width: '16px', height: '16px' }} />
            Pending Requests
          </button>
          <button
            onClick={() => setActiveTab('students')}
            style={activeTab === 'students' ? activeTabStyle : inactiveTabStyle}
            onMouseEnter={(e) => {
              if (activeTab !== 'students') e.target.style.color = '#111827';
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'students') e.target.style.color = '#6b7280';
            }}
          >
            <User style={{ width: '16px', height: '16px' }} />
            View Students
          </button>
          <button
            onClick={() => setActiveTab('tutors')}
            style={activeTab === 'tutors' ? activeTabStyle : inactiveTabStyle}
            onMouseEnter={(e) => {
              if (activeTab !== 'tutors') e.target.style.color = '#111827';
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'tutors') e.target.style.color = '#6b7280';
            }}
          >
            <BookOpen style={{ width: '16px', height: '16px' }} />
            View Tutors
          </button>
          <button
            onClick={() => setActiveTab('assign')}
            style={activeTab === 'assign' ? activeTabStyle : inactiveTabStyle}
            onMouseEnter={(e) => {
              if (activeTab !== 'assign') e.target.style.color = '#111827';
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'assign') e.target.style.color = '#6b7280';
            }}
          >
            <Users style={{ width: '16px', height: '16px' }} />
            Assign Students
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            style={activeTab === 'attendance' ? activeTabStyle : inactiveTabStyle}
            onMouseEnter={(e) => {
              if (activeTab !== 'attendance') e.target.style.color = '#111827';
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'attendance') e.target.style.color = '#6b7280';
            }}
          >
            <Calendar style={{ width: '16px', height: '16px' }} />
            View Attendance
          </button>
        </div>

        <div style={contentAreaStyle}>
          {activeTab === 'pending' && renderPendingRequests()}
          {activeTab === 'students' && renderApprovedUsers(approvedStudents, 'Approved Students')}
          {activeTab === 'tutors' && renderApprovedUsers(approvedTutors, 'Approved Tutors')}
          {activeTab === 'assign' && renderPlaceholderContent('Assign Students to Tutors', 'Assignment functionality coming soon...')}
          {activeTab === 'attendance' && renderPlaceholderContent('Attendance Management', 'Attendance tracking functionality coming soon...')}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;