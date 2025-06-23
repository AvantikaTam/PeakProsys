import React, { useState } from 'react';

const AuthPage = ({ selectedRole, onSignup, onBackToRoleSelection }) => {
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
      onSignup(userData);
    }
  };

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
    marginBottom: '24px'
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

  const textareaStyle = {
    ...inputStyle,
    resize: 'vertical',
    minHeight: '60px'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

  const linkButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#4f46e5',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    textDecoration: 'underline'
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

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            {selectedRole} {isLogin ? 'Login' : 'Registration'}
          </h2>
        </div>

        <div style={formStyle}>
          <div>
            <label style={labelStyle}>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              required
            />
          </div>

          {!isLogin && (
            <>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div>
                <label style={labelStyle}>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  style={textareaStyle}
                  onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              {selectedRole === 'STUDENT' && (
                <>
                  <div>
                    <label style={labelStyle}>Class</label>
                    <input
                      type="text"
                      name="className"
                      value={formData.className}
                      onChange={handleInputChange}
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                      required
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Parent Name</label>
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleInputChange}
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Parent Contact</label>
                    <input
                      type="tel"
                      name="parentContact"
                      value={formData.parentContact}
                      onChange={handleInputChange}
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </div>
                </>
              )}

              {selectedRole === 'TUTOR' && (
                <>
                  <div>
                    <label style={labelStyle}>Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                      required
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Experience Years</label>
                    <input
                      type="number"
                      name="experienceYears"
                      value={formData.experienceYears}
                      onChange={handleInputChange}
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Qualification</label>
                    <input
                      type="text"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleInputChange}
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </div>
                </>
              )}
            </>
          )}

          <button
            onClick={handleSubmit}
            style={buttonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#3730a3'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#4f46e5'}
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </div>

        <div style={centerStyle}>
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={linkButtonStyle}
          >
            {isLogin ? 'Need to register?' : 'Already have an account?'}
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
      </div>
    </div>
  );
};

export default AuthPage;