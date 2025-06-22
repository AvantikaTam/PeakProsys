export default function Navbar({ user, setUser }) {
    return (
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: 'white'
      }}>
        <div>Achievers Academy</div>
        <div>
          {user ? (
            <>
              <span style={{ marginRight: '15px' }}>Hello, {user.name}</span>
              <button 
                onClick={() => setUser(null)}
                style={{ padding: '5px 10px' }}
              >
                Logout
              </button>
            </>
          ) : (
            <a href="/auth" style={{ color: 'white', textDecoration: 'none' }}>Login/Register</a>
          )}
        </div>
      </nav>
    );
  }