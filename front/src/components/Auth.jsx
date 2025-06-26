import React, { useState } from 'react';
import { login, signup } from '../api';

const Auth = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '', password: '', email: '', firstName: '', lastName: '', phoneNumber: '', role: 'STUDENT'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = isLogin 
        ? await login(formData.username, formData.password)
        : await signup(formData);
      setUser(user);
    } catch (err) {
      setError(err.message || 'Authentication failed');
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '50px auto',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      background: '#fff'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#4a5568' }}>
        {isLogin ? 'Login' : 'Sign Up'}
      </h2>
      
      {error && (
        <div style={{
          color: 'white',
          backgroundColor: '#e53e3e',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '15px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '5px',
              border: '1px solid #e2e8f0',
              fontSize: '16px'
            }}
            required
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '5px',
              border: '1px solid #e2e8f0',
              fontSize: '16px'
            }}
            required
          />
        </div>
        
        {!isLogin && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '5px',
                  border: '1px solid #e2e8f0',
                  fontSize: '16px'
                }}
                required
              />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '5px',
                  border: '1px solid #e2e8f0',
                  fontSize: '16px'
                }}
                required
              />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '5px',
                  border: '1px solid #e2e8f0',
                  fontSize: '16px'
                }}
                required
              />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '5px',
                  border: '1px solid #e2e8f0',
                  fontSize: '16px'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '5px',
                  border: '1px solid #e2e8f0',
                  fontSize: '16px',
                  background: 'white'
                }}
              >
                <option value="STUDENT">Student</option>
                <option value="TUTOR">Tutor</option>
              </select>
            </div>
          </>
        )}
        
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            marginBottom: '15px'
          }}
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{
            background: 'none',
            border: 'none',
            color: '#4a5568',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default Auth;