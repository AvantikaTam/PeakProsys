export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/auth';
};

export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

export const checkAuth = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Auth check failed:', errorData);
      return null;
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Expected JSON but got:', text);
      return null;
    }
    
    return await response.json();
  } catch (err) {
    console.error('Auth check error:', err);
    return null;
  }
};

const API_URL = 'http://localhost:8086/api';