export default function Dashboard({ user }) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Welcome, {user.name}</h2>
        
        {user.role === 'student' && (
          <div style={cardStyle}>
            <h3>Your Dashboard</h3>
            <p><strong>Courses:</strong> Mathematics, Science, English</p>
            <p><strong>Attendance:</strong> 85%</p>
            <p><strong>Assignments:</strong> 3 pending</p>
          </div>
        )}
        
        {user.role === 'tutor' && (
          <div style={cardStyle}>
            <h3>Tutor Dashboard</h3>
            <p><strong>Assigned Students:</strong> 15</p>
            <p><strong>Batches:</strong> A, B, C</p>
            <p><strong>Upcoming Classes:</strong> 2 today</p>
          </div>
        )}
      </div>
    );
  }
  
  const cardStyle = {
    padding: '15px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };