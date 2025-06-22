import React, { useState, useEffect } from 'react';

const AchieversAcademy = () => {
  const [activeModule, setActiveModule] = useState('view-tutor');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const modules = [
    { id: 'view-tutor', name: 'View Tutor', icon: '👨‍🏫' },
    { id: 'student', name: 'Student', icon: '🎓' },
    { id: 'assign-tutor', name: 'Assign Tutor', icon: '✅' },
    { id: 'view-attendance', name: 'View Attendance', icon: '📅' },
  ];

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'view-tutor':
        return (
          <div className="module-container">
            <h2 className="module-title">
              <span className="module-icon">👨‍🏫</span>
              View Tutors
            </h2>
            <div className="tutors-grid">
              {[1, 2, 3, 4, 5, 6].map((tutor) => (
                <div key={tutor} className="tutor-card">
                  <div className="tutor-header">
                    <div className="tutor-avatar">
                      T{tutor}
                    </div>
                    <div className="tutor-info">
                      <h3 className="tutor-name">Tutor {tutor}</h3>
                      <p className="tutor-role">Subject Specialist</p>
                    </div>
                  </div>
                  <div className="tutor-details">
                    <p className="detail-item">Experience: {2 + tutor} years</p>
                    <p className="detail-item">Students: {10 + tutor * 2}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'student':
        return (
          <div className="module-container">
            <h2 className="module-title">
              <span className="module-icon">🎓</span>
              Students
            </h2>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Contact</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((student) => (
                    <tr key={student}>
                      <td>STU00{student}</td>
                      <td>Student {student}</td>
                      <td>Class {8 + student}</td>
                      <td>+91 98765{4320 + student}</td>
                      <td>
                        <span className="status-badge status-active">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'assign-tutor':
        return (
          <div className="module-container">
            <h2 className="module-title">
              <span className="module-icon">✅</span>
              Assign Tutor
            </h2>
            <form className="assignment-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Select Student</label>
                  <select className="form-select">
                    <option>Choose a student...</option>
                    <option>Student 1 - STU001</option>
                    <option>Student 2 - STU002</option>
                    <option>Student 3 - STU003</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Select Tutor</label>
                  <select className="form-select">
                    <option>Choose a tutor...</option>
                    <option>Tutor 1 - Mathematics</option>
                    <option>Tutor 2 - Science</option>
                    <option>Tutor 3 - English</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input type="text" className="form-input" placeholder="Enter subject" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input type="date" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Session Time</label>
                  <input type="time" className="form-input" />
                </div>
              </div>
              <button 
                type="button"
                className="btn btn-primary"
                onClick={() => alert('Tutor assignment submitted!')}
              >
                Assign Tutor
              </button>
            </form>
          </div>
        );
      
      case 'view-attendance':
        return (
          <div className="module-container">
            <h2 className="module-title">
              <span className="module-icon">📅</span>
              View Attendance
            </h2>
            <div className="stats-grid">
              <div className="stat-card stat-success">
                <h3 className="stat-title">Total Present</h3>
                <p className="stat-value">248</p>
              </div>
              <div className="stat-card stat-danger">
                <h3 className="stat-title">Total Absent</h3>
                <p className="stat-value">32</p>
              </div>
              <div className="stat-card stat-warning">
                <h3 className="stat-title">Late Arrivals</h3>
                <p className="stat-value">15</p>
              </div>
              <div className="stat-card stat-info">
                <h3 className="stat-title">Attendance Rate</h3>
                <p className="stat-value">88.6%</p>
              </div>
            </div>
            <div className="table-wrapper">
              <table className="data-table attendance-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th className="text-center">22/06</th>
                    <th className="text-center">21/06</th>
                    <th className="text-center">20/06</th>
                    <th className="text-center">19/06</th>
                    <th className="text-center">18/06</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((student) => (
                    <tr key={student}>
                      <td>Student {student}</td>
                      <td className="text-center">
                        <span className="attendance-dot present"></span>
                      </td>
                      <td className="text-center">
                        <span className="attendance-dot present"></span>
                      </td>
                      <td className="text-center">
                        <span className={`attendance-dot ${student === 3 ? 'absent' : 'present'}`}></span>
                      </td>
                      <td className="text-center">
                        <span className="attendance-dot present"></span>
                      </td>
                      <td className="text-center">
                        <span className={`attendance-dot ${student === 2 ? 'late' : 'present'}`}></span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      default:
        return <div className="empty-state">Select a module from the navigation</div>;
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          line-height: 1.6;
          color: #333;
        }

        .app-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          background-attachment: fixed;
        }

        .content-wrapper {
          min-height: 100vh;
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
        }

        /* Header Styles */
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .logo-circle {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 1.25rem;
          transition: all 0.3s ease;
        }

        .logo-circle:hover {
          transform: scale(1.05);
          background: rgba(255, 255, 255, 0.3);
        }

        .header-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header-subtitle {
          font-size: 0.875rem;
          opacity: 0.9;
          font-weight: 300;
        }

        .header-user {
          text-align: right;
          display: none;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: background-color 0.2s;
        }

        .mobile-menu-btn:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        /* Navigation Styles */
        .nav {
          background: white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          position: sticky;
          top: 88px;
          z-index: 99;
        }

        .nav-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .nav-buttons {
          display: flex;
          gap: 0.5rem;
          padding: 1rem 0;
          overflow-x: auto;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }

        .nav-buttons::-webkit-scrollbar {
          display: none;
        }

        .nav-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          font-weight: 500;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
        }

        .nav-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.5s;
        }

        .nav-btn:hover::before {
          left: 100%;
        }

        .nav-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          transform: translateY(-2px);
        }

        .nav-btn:not(.active) {
          background-color: #f8fafc;
          color: #64748b;
          border: 1px solid #e2e8f0;
        }

        .nav-btn:not(.active):hover {
          background-color: #f1f5f9;
          color: #475569;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        /* Main Content */
        .main {
          flex: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
          min-height: calc(100vh - 200px);
        }

        .module-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
          padding: 2rem;
          border: 1px solid #e2e8f0;
        }

        .module-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #f1f5f9;
        }

        .module-icon {
          font-size: 2rem;
        }

        /* Tutors Grid */
        .tutors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .tutor-card {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
          cursor: pointer;
          background: white;
        }

        .tutor-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          border-color: #cbd5e1;
        }

        .tutor-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .tutor-avatar {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          margin-right: 1rem;
          font-size: 1.1rem;
        }

        .tutor-info {
          flex: 1;
        }

        .tutor-name {
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.25rem;
          font-size: 1.1rem;
        }

        .tutor-role {
          font-size: 0.875rem;
          color: #64748b;
        }

        .tutor-details {
          color: #64748b;
          font-size: 0.875rem;
        }

        .detail-item {
          margin: 0.25rem 0;
        }

        /* Table Styles */
        .table-wrapper {
          overflow-x: auto;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 12px;
          overflow: hidden;
        }

        .data-table th {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .data-table td {
          padding: 1rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .data-table tr:hover {
          background-color: #f8fafc;
        }

        .text-center {
          text-align: center;
        }

        /* Status Badge */
        .status-badge {
          padding: 0.375rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-active {
          background-color: #dcfce7;
          color: #166534;
        }

        /* Form Styles */
        .assignment-form {
          max-width: 600px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .form-input,
        .form-select {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s ease;
          background: white;
        }

        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        /* Button Styles */
        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid;
          transition: transform 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
        }

        .stat-title {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: bold;
          margin: 0;
        }

        .stat-success {
          background-color: #f0fdf4;
          border-color: #bbf7d0;
        }

        .stat-success .stat-title {
          color: #166534;
        }

        .stat-success .stat-value {
          color: #16a34a;
        }

        .stat-danger {
          background-color: #fef2f2;
          border-color: #fecaca;
        }

        .stat-danger .stat-title,
        .stat-danger .stat-value {
          color: #dc2626;
        }

        .stat-warning {
          background-color: #fffbeb;
          border-color: #fed7aa;
        }

        .stat-warning .stat-title,
        .stat-warning .stat-value {
          color: #d97706;
        }

        .stat-info {
          background-color: #eff6ff;
          border-color: #bfdbfe;
        }

        .stat-info .stat-title,
        .stat-info .stat-value {
          color: #2563eb;
        }

        /* Attendance Dots */
        .attendance-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: inline-block;
          transition: transform 0.2s ease;
        }

        .attendance-dot:hover {
          transform: scale(1.2);
        }

        .attendance-dot.present {
          background-color: #10b981;
        }

        .attendance-dot.absent {
          background-color: #ef4444;
        }

        .attendance-dot.late {
          background-color: #eab308;
        }

        /* Footer */
        .footer {
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          color: white;
          padding: 3rem 1.5rem 1rem;
          margin-top: 3rem;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .footer-logo-circle {
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
        }

        .footer-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: white;
        }

        .footer-text {
          color: #cbd5e1;
          font-size: 0.875rem;
          line-height: 1.6;
        }

        .footer-links {
          list-style: none;
        }

        .footer-links li {
          margin-bottom: 0.5rem;
        }

        .footer-links a {
          color: #cbd5e1;
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-links a:hover {
          color: white;
        }

        .footer-bottom {
          border-top: 1px solid #475569;
          margin-top: 2rem;
          padding-top: 1.5rem;
          text-align: center;
          font-size: 0.875rem;
          color: #cbd5e1;
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          color: #64748b;
          font-size: 1.1rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .header-user {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }

          .nav-buttons {
            flex-direction: column;
            display: none;
          }

          .nav-buttons.mobile-open {
            display: flex;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .tutors-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .main {
            padding: 1rem;
          }

          .module-container {
            padding: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .header-content {
            padding: 0.75rem 1rem;
          }

          .header-title {
            font-size: 1.25rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .data-table th,
          .data-table td {
            padding: 0.75rem 0.5rem;
          }
        }
      `}</style>

      <div className="app-container">
        <div className="content-wrapper">
          {/* Header */}
          <header className="header">
            <div className="header-content">
              <div className="logo">
                <div className="logo-circle">AA</div>
                <div>
                  <h1 className="header-title">Achievers Academy</h1>
                  <p className="header-subtitle">Excellence in Education</p>
                </div>
              </div>
              <div className="header-user">
                <div style={{textAlign: 'right'}}>
                  <p style={{fontSize: '0.875rem', opacity: 0.9, margin: 0}}>Welcome back!</p>
                  <p style={{fontWeight: '600', margin: 0}}>Admin Panel</p>
                </div>
              </div>
              <button 
                className="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </header>

          {/* Navigation */}
          <nav className="nav">
            <div className="nav-content">
              <div className={`nav-buttons ${isMobile && isMobileMenuOpen ? 'mobile-open' : ''}`}>
                {modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => {
                      setActiveModule(module.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`nav-btn ${activeModule === module.id ? 'active' : ''}`}
                  >
                    <span style={{fontSize: '1.125rem'}}>{module.icon}</span>
                    <span>{module.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="main">
            {renderModuleContent()}
          </main>

          {/* Footer */}
          <footer className="footer">
            <div className="footer-content">
              <div>
                <div className="footer-logo">
                  <div className="footer-logo-circle">AA</div>
                  <div>
                    <h3 className="footer-title" style={{margin: 0, fontSize: '1.125rem'}}>Achievers Academy</h3>
                    <p style={{fontSize: '0.875rem', color: '#cbd5e1', margin: 0}}>Excellence in Education</p>
                  </div>
                </div>
                <p className="footer-text">
                  Empowering students to achieve their dreams through quality education and personalized tutoring.
                </p>
              </div>
              <div>
                <h4 className="footer-title">Quick Links</h4>
                <ul className="footer-links">
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Courses</a></li>
                  <li><a href="#">Tutors</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="footer-title">Contact Info</h4>
                <div className="footer-text">
                  <p style={{margin: '0.5rem 0'}}>📍 123 Education Street, Learning City</p>
                  <p style={{margin: '0.5rem 0'}}>📞 +91 98765 43210</p>
                  <p style={{margin: '0.5rem 0'}}>✉️ info@achieversacademy.com</p>
                  <p style={{margin: '0.5rem 0'}}>🌐 www.achieversacademy.com</p>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p style={{margin: 0}}>&copy; 2025 Achievers Academy. All rights reserved. | Designed for Excellence</p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default AchieversAcademy;