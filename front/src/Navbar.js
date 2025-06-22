export default function Navbar({ user, logout }) {
    return (
      <div style={{
        background: '#333',
        padding: '10px 20px',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Achievers Academy</span>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '15px' }}>
            {user.role === 'admin' ? 'Admin' : user.role === 'tutor' ? 'Tutor' : 'Student'} Panel
          </span>
          <button 
            onClick={logout}
            style={{
              padding: '5px 10px',
              background: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }