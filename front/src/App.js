import React, { useState, useEffect } from 'react';
import { User, GraduationCap, UserCheck, Users, Calendar, BookOpen, Settings } from 'lucide-react';

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

  const RoleSelectionPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <GraduationCap className="mx-auto h-12 w-12 text-indigo-600 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Achievers Academy</h1>
          <p className="text-gray-600 mt-2">Select your role to continue</p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => handleRoleSelection('STUDENT')}
            className="w-full flex items-center justify-center p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
          >
            <User className="h-6 w-6 text-blue-600 mr-3" />
            <span className="text-lg font-medium text-gray-700">Student</span>
          </button>
          
          <button
            onClick={() => handleRoleSelection('TUTOR')}
            className="w-full flex items-center justify-center p-4 border-2 border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors"
          >
            <BookOpen className="h-6 w-6 text-green-600 mr-3" />
            <span className="text-lg font-medium text-gray-700">Tutor</span>
          </button>
          
          <button
            onClick={() => handleRoleSelection('ADMIN')}
            className="w-full flex items-center justify-center p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors"
          >
            <Settings className="h-6 w-6 text-purple-600 mr-3" />
            <span className="text-lg font-medium text-gray-700">Admin</span>
          </button>
        </div>
      </div>
    </div>
  );

  const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
      username: '',
      password: '',
      name: '',
      phone: '',
      email: '',
      address: '',
      className: '',
      parentName: '',
      parentContact: '',
      subject: '',
      experienceYears: '',
      qualification: ''
    });

    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
      if (isLogin) {
        alert('Login functionality not implemented in this demo');
      } else {
        const userData = {
          ...formData,
          role: selectedRole,
          approved: false
        };
        handleSignup(userData);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedRole} {isLogin ? 'Login' : 'Registration'}
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    rows="2"
                  />
                </div>

                {selectedRole === 'STUDENT' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Class</label>
                      <input
                        type="text"
                        name="className"
                        value={formData.className}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Parent Name</label>
                      <input
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Parent Contact</label>
                      <input
                        type="tel"
                        name="parentContact"
                        value={formData.parentContact}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </>
                )}

                {selectedRole === 'TUTOR' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Experience Years</label>
                      <input
                        type="number"
                        name="experienceYears"
                        value={formData.experienceYears}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Qualification</label>
                      <input
                        type="text"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </>
                )}
              </>
            )}

            <button
              onClick={handleSubmit}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
            >
              {isLogin ? 'Need to register?' : 'Already have an account?'}
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => setCurrentView('role-selection')}
              className="text-gray-600 hover:text-gray-500 text-sm"
            >
              Back to role selection
            </button>
          </div>
        </div>
      </div>
    );
  };

  const AdminLoginPage = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleLogin = () => {
      if (credentials.username === 'admin' && credentials.password === 'admin') {
        setCurrentUser({ username: 'admin', role: 'ADMIN' });
        setCurrentView('admin-dashboard');
      } else {
        alert('Invalid credentials');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <Settings className="mx-auto h-12 w-12 text-purple-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Login
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => setCurrentView('role-selection')}
              className="text-gray-600 hover:text-gray-500 text-sm"
            >
              Back to role selection
            </button>
          </div>
          
          <div className="mt-2 text-center text-xs text-gray-500">
            Demo: username: admin, password: admin
          </div>
        </div>
      </div>
    );
  };

  const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('pending');

    const renderPendingRequests = () => (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Pending Approval Requests</h3>
        {pendingRequests.length === 0 ? (
          <p className="text-gray-500">No pending requests</p>
        ) : (
          pendingRequests.map((user) => (
            <div key={user.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{user.name}</h4>
                  <p className="text-sm text-gray-600">Role: {user.role}</p>
                  <p className="text-sm text-gray-600">Username: {user.username}</p>
                  <p className="text-sm text-gray-600">Phone: {user.phone}</p>
                  {user.role === 'STUDENT' && (
                    <>
                      <p className="text-sm text-gray-600">Class: {user.className}</p>
                      <p className="text-sm text-gray-600">Parent: {user.parentName}</p>
                    </>
                  )}
                  {user.role === 'TUTOR' && (
                    <>
                      <p className="text-sm text-gray-600">Subject: {user.subject}</p>
                      <p className="text-sm text-gray-600">Experience: {user.experienceYears} years</p>
                    </>
                  )}
                </div>
                <button
                  onClick={() => handleApproval(user.id, user.role)}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
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
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {users.length === 0 ? (
          <p className="text-gray-500">No {title.toLowerCase()} found</p>
        ) : (
          <div className="grid gap-4">
            {users.map((user) => (
              <div key={user.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="font-medium text-gray-900">{user.name}</h4>
                <p className="text-sm text-gray-600">Username: {user.username}</p>
                <p className="text-sm text-gray-600">Phone: {user.phone}</p>
                {user.className && <p className="text-sm text-gray-600">Class: {user.className}</p>}
                {user.subject && <p className="text-sm text-gray-600">Subject: {user.subject}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    );

    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <GraduationCap className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-semibold text-gray-900">Admin Dashboard</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, {currentUser.username}</span>
                <button
                  onClick={() => {
                    setCurrentUser(null);
                    setCurrentView('role-selection');
                  }}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'pending'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <UserCheck className="inline h-4 w-4 mr-2" />
              Pending Requests
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'students'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className="inline h-4 w-4 mr-2" />
              View Students
            </button>
            <button
              onClick={() => setActiveTab('tutors')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'tutors'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BookOpen className="inline h-4 w-4 mr-2" />
              View Tutors
            </button>
            <button
              onClick={() => setActiveTab('assign')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'assign'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users className="inline h-4 w-4 mr-2" />
              Assign Students
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'attendance'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Calendar className="inline h-4 w-4 mr-2" />
              View Attendance
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            {activeTab === 'pending' && renderPendingRequests()}
            {activeTab === 'students' && renderApprovedUsers(approvedStudents, 'Approved Students')}
            {activeTab === 'tutors' && renderApprovedUsers(approvedTutors, 'Approved Tutors')}
            {activeTab === 'assign' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Assign Students to Tutors</h3>
                <p className="text-gray-600">Assignment functionality coming soon...</p>
              </div>
            )}
            {activeTab === 'attendance' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Management</h3>
                <p className="text-gray-600">Attendance tracking functionality coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {currentView === 'role-selection' && <RoleSelectionPage />}
      {currentView === 'auth' && <AuthPage />}
      {currentView === 'admin-login' && <AdminLoginPage />}
      {currentView === 'admin-dashboard' && <AdminDashboard />}
    </div>
  );
};

export default AcademyManagementApp;