import React, { useState, useEffect } from 'react';
import { getPendingUsers, approveUser, rejectUser, getAllBatches, createBatch } from '../api';

const Admin = ({ user }) => {
  const [pendingUsers, setPendingUsers] = useState({ students: [], tutors: [] });
  const [batches, setBatches] = useState([]);
  const [newBatch, setNewBatch] = useState({ name: '', description: '' });
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    const fetchData = async () => {
      const users = await getPendingUsers();
      const batchList = await getAllBatches();
      setPendingUsers(users);
      setBatches(batchList);
    };
    fetchData();
  }, []);

  const handleApprove = async (userId) => {
    await approveUser(userId);
    setPendingUsers({
      students: pendingUsers.students.filter(u => u.id !== userId),
      tutors: pendingUsers.tutors.filter(u => u.id !== userId)
    });
  };

  const handleReject = async (userId) => {
    await rejectUser(userId);
    setPendingUsers({
      students: pendingUsers.students.filter(u => u.id !== userId),
      tutors: pendingUsers.tutors.filter(u => u.id !== userId)
    });
  };

  const handleCreateBatch = async (e) => {
    e.preventDefault();
    const batch = await createBatch(newBatch);
    setBatches([...batches, batch]);
    setNewBatch({ name: '', description: '' });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#4a5568', marginBottom: '30px' }}>Admin Dashboard</h1>
      
      <div style={{ display: 'flex', marginBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
        <button
          onClick={() => setActiveTab('users')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'users' ? '#edf2f7' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontWeight: activeTab === 'users' ? 'bold' : 'normal'
          }}
        >
          Pending Users
        </button>
        <button
          onClick={() => setActiveTab('batches')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'batches' ? '#edf2f7' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontWeight: activeTab === 'batches' ? 'bold' : 'normal'
          }}
        >
          Batches
        </button>
      </div>
      
      {activeTab === 'users' && (
        <div>
          <h2 style={{ color: '#4a5568', marginBottom: '20px' }}>Pending Approvals</h2>
          
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ color: '#4a5568' }}>Students</h3>
            {pendingUsers.students.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {pendingUsers.students.map(user => (
                  <div key={user.id} style={{
                    padding: '20px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '5px',
                    background: '#fff'
                  }}>
                    <h4 style={{ margin: '0 0 10px' }}>{user.firstName} {user.lastName}</h4>
                    <p style={{ margin: '0 0 10px', color: '#718096' }}>{user.email}</p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => handleApprove(user.id)}
                        style={{
                          padding: '8px 15px',
                          background: '#48bb78',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(user.id)}
                        style={{
                          padding: '8px 15px',
                          background: '#f56565',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p>No pending student approvals</p>}
          </div>
          
          <div>
            <h3 style={{ color: '#4a5568' }}>Tutors</h3>
            {pendingUsers.tutors.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {pendingUsers.tutors.map(user => (
                  <div key={user.id} style={{
                    padding: '20px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '5px',
                    background: '#fff'
                  }}>
                    <h4 style={{ margin: '0 0 10px' }}>{user.firstName} {user.lastName}</h4>
                    <p style={{ margin: '0 0 10px', color: '#718096' }}>{user.email}</p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => handleApprove(user.id)}
                        style={{
                          padding: '8px 15px',
                          background: '#48bb78',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(user.id)}
                        style={{
                          padding: '8px 15px',
                          background: '#f56565',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p>No pending tutor approvals</p>}
          </div>
        </div>
      )}
      
      {activeTab === 'batches' && (
        <div>
          <h2 style={{ color: '#4a5568', marginBottom: '20px' }}>Batch Management</h2>
          
          <form onSubmit={handleCreateBatch} style={{ 
            marginBottom: '30px', 
            padding: '20px', 
            border: '1px solid #e2e8f0', 
            borderRadius: '5px',
            background: '#fff'
          }}>
            <h3 style={{ marginTop: '0' }}>Create New Batch</h3>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="text"
                placeholder="Batch Name"
                value={newBatch.name}
                onChange={(e) => setNewBatch({...newBatch, name: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #e2e8f0'
                }}
                required
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <textarea
                placeholder="Description"
                value={newBatch.description}
                onChange={(e) => setNewBatch({...newBatch, description: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #e2e8f0',
                  minHeight: '80px'
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                background: '#4299e1',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Create Batch
            </button>
          </form>
          
          <h3 style={{ color: '#4a5568' }}>All Batches</h3>
          {batches.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {batches.map(batch => (
                <div key={batch.id} style={{
                  padding: '20px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '5px',
                  background: '#fff'
                }}>
                  <h4 style={{ margin: '0 0 10px' }}>{batch.name}</h4>
                  <p style={{ margin: '0 0 15px', color: '#718096' }}>{batch.description}</p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={{
                      padding: '5px 10px',
                      background: '#ed8936',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}>
                      Edit
                    </button>
                    <button style={{
                      padding: '5px 10px',
                      background: '#f56565',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : <p>No batches created yet</p>}
        </div>
      )}
    </div>
  );
};

export default Admin;