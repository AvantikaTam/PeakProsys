const API_URL = 'http://localhost:8086/api';

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Login failed');
  localStorage.setItem('token', data.token);
  return data.user;
};

export const signup = async (userData) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Signup failed');
  return data;
};

// Admin APIs
export const getPendingUsers = async () => {
  const response = await fetch(`${API_URL}/admin/pending-users`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  if (!response.ok) throw new Error('Failed to fetch pending users');
  return await response.json();
};

export const approveUser = async (userId) => {
  const response = await fetch(`${API_URL}/admin/approve-user/${userId}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  if (!response.ok) throw new Error('Failed to approve user');
};

export const rejectUser = async (userId) => {
  const response = await fetch(`${API_URL}/admin/reject-user/${userId}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  if (!response.ok) throw new Error('Failed to reject user');
};

export const getAllBatches = async () => {
  const response = await fetch(`${API_URL}/admin/batches`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  if (!response.ok) throw new Error('Failed to fetch batches');
  return await response.json();
};

export const createBatch = async (batchData) => {
  const response = await fetch(`${API_URL}/admin/batches`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(batchData)
  });
  if (!response.ok) throw new Error('Failed to create batch');
  return await response.json();
};

// Tutor APIs
export const getBatchesForTutor = async () => {
  const response = await fetch(`${API_URL}/tutor/batches`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  if (!response.ok) throw new Error('Failed to fetch tutor batches');
  return await response.json();
};

export const markAttendance = async (attendanceData) => {
  const response = await fetch(`${API_URL}/tutor/attendance/mark`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(attendanceData)
  });
  if (!response.ok) throw new Error('Failed to mark attendance');
  return await response.json();
};

export const uploadResource = async (formData) => {
  const response = await fetch(`${API_URL}/tutor/resources/upload`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    body: formData
  });
  if (!response.ok) throw new Error('Failed to upload resource');
  return await response.json();
};

// Student APIs
export const getBatchesForStudent = async () => {
  const response = await fetch(`${API_URL}/student/batches`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  if (!response.ok) throw new Error('Failed to fetch student batches');
  return await response.json();
};

export const getAttendance = async (startDate, endDate) => {
  const response = await fetch(`${API_URL}/student/attendance?startDate=${startDate}&endDate=${endDate}`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  if (!response.ok) throw new Error('Failed to fetch attendance');
  return await response.json();
};

export const getBatchResources = async (batchId) => {
  const response = await fetch(`${API_URL}/student/resources/batch/${batchId}`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  if (!response.ok) throw new Error('Failed to fetch batch resources');
  return await response.json();
};