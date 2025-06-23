import React, { useState, useEffect } from 'react';
import RoleSelectionPage from './RoleSelectionPage';
import AuthPage from './AuthPage';
import AdminLoginPage from './AdminLoginPage';
import AdminDashboard from './AdminDashboard';

const AcademyManagementApp = () => {
  const [currentView, setCurrentView] = useState('role-selection');
  const [selectedRole, setSelectedRole] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [approvedStudents, setApprovedStudents] = useState([]);
  const [approvedTutors, setApprovedTutors] = useState([]);

  // Mock API calls - replace with actual API endpoints
  const API_BASE = 'http://localhost:8086/api';

  const fetchPendingRequests = async () => {
    try {
      const [studentsRes, tutorsRes] = await Promise.all([
        fetch(`${API_BASE}/students/pending`),
        fetch(`${API_BASE}/tutors/pending`)
      ]);
      const pendingStudents = await studentsRes.json();
      const pendingTutors = await tutorsRes.json();
      setPendingRequests([...pendingStudents, ...pendingTutors]);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    }
  };

  const fetchApprovedUsers = async () => {
    try {
      const [studentsRes, tutorsRes] = await Promise.all([
        fetch(`${API_BASE}/students`),
        fetch(`${API_BASE}/tutors`)
      ]);
      const students = await studentsRes.json();
      const tutors = await tutorsRes.json();
      setApprovedStudents(students);
      setApprovedTutors(tutors);
    } catch (error) {
      console.error('Error fetching approved users:', error);
    }
  };

  useEffect(() => {
    if (currentUser?.role === 'ADMIN') {
      fetchPendingRequests();
      fetchApprovedUsers();
    }
  }, [currentUser]);

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    if (role === 'ADMIN') {
      setCurrentView('admin-login');
    } else {
      setCurrentView('auth');
    }
  };

  const handleSignup = async (formData) => {
    try {
      const endpoint = selectedRole === 'STUDENT' ? '/students' : '/tutors';
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Registration successful! Please wait for admin approval.');
        setCurrentView('role-selection');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const handleApproval = async (userId, userType) => {
    try {
      const endpoint = userType === 'STUDENT' ? '/students' : '/tutors';
      const response = await fetch(`${API_BASE}${endpoint}/approve/${userId}`, {
        method: 'POST'
      });
      
      if (response.ok) {
        alert(`${userType} approved successfully!`);
        fetchPendingRequests();
        fetchApprovedUsers();
      }
    } catch (error) {
      console.error('Approval error:', error);
    }
  };

  const commonProps = {
    setCurrentView,
    selectedRole,
    currentUser,
    setCurrentUser,
    pendingRequests,
    approvedStudents,
    approvedTutors,
    handleRoleSelection,
    handleSignup,
    handleApproval
  };

  return (
    <div>
      {currentView === 'role-selection' && (
        <RoleSelectionPage 
          onRoleSelect={handleRoleSelection}
        />
      )}
      {currentView === 'auth' && (
        <AuthPage 
          selectedRole={selectedRole}
          onSignup={handleSignup}
          onBackToRoleSelection={() => setCurrentView('role-selection')}
        />
      )}
      {currentView === 'admin-login' && (
        <AdminLoginPage 
          onLogin={(user) => {
            setCurrentUser(user);
            setCurrentView('admin-dashboard');
          }}
          onBackToRoleSelection={() => setCurrentView('role-selection')}
        />
      )}
      {currentView === 'admin-dashboard' && (
        <AdminDashboard 
          currentUser={currentUser}
          pendingRequests={pendingRequests}
          approvedStudents={approvedStudents}
          approvedTutors={approvedTutors}
          onApproval={handleApproval}
          onLogout={() => {
            setCurrentUser(null);
            setCurrentView('role-selection');
          }}
        />
      )}
    </div>
  );
};

export default AcademyManagementApp;