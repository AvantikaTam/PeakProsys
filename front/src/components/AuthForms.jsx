import { useState } from 'react';

export default function AuthForms({ setUser }) {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      role: 'student'
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const url = isLogin ? '/api/auth/login' : '/api/auth/register';
      
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };
  
    return (
      <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
          )}
          <div style={{ marginBottom: '10px' }}>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          {!isLogin && (
            <div style={{ marginBottom: '10px' }}>
              <select
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                style={{ width: '100%', padding: '8px' }}
              >
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
              </select>
            </div>
          )}
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button 
          onClick={() => setIsLogin(!isLogin)}
          style={{ marginTop: '10px', width: '100%', padding: '10px' }}
        >
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </div>
    );
  }