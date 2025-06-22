import React, { useState } from 'react';

export default function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ 
    email: '', 
    password: '', 
    name: '', 
    role: 'student' 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo purposes - in real app, make API call here
    const mockUser = {
      id: 1,
      name: form.name || 'Test User',
      email: form.email,
      role: form.role,
      token: 'mock-token'
    };
    setUser(mockUser);
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '50px auto',
      padding: '20px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Name"
              style={inputStyle}
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              required
            />
            <select 
              style={inputStyle}
              value={form.role}
              onChange={(e) => setForm({...form, role: e.target.value})}
            >
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
              <option value="admin">Admin</option>
            </select>
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          style={inputStyle}
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
          required
        />
        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
          value={form.password}
          onChange={(e) => setForm({...form, password: e.target.value})}
          required
          minLength="6"
        />
        <button type="submit" style={buttonStyle}>
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <button 
        onClick={() => setIsLogin(!isLogin)} 
        style={{...buttonStyle, background: 'none', color: '#666'}}
      >
        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
      </button>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  border: '1px solid #ddd',
  borderRadius: '4px'
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  background: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};