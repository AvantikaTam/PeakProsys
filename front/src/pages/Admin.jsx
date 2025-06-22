import { useState, useEffect } from 'react';

export default function Admin({ user }) {
  const [activeTab, setActiveTab] = useState('pending');
  const [tutors, setTutors] = useState([]);
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetch('/api/tutors/pending').then(res => res.json()).then(setTutors);
      fetch('/api/students/pending').then(res => res.json()).then(setStudents);
      fetch('/api/batches').then(res => res.json()).then(setBatches);
    }
  }, [user]);

  const approveUser = async (type, id) => {
    const url = `/api/${type}s/approve/${id}`;
    await fetch(url, { method: 'POST' });
    if (type === 'tutor') {
      setTutors(tutors.filter(t => t.id !== id));
    } else {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        {['pending', 'tutors', 'students', 'assign', 'attendance', 'batches'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px',
              marginRight: '5px',
              backgroundColor: activeTab === tab ? '#ddd' : '#eee'
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'pending' && (
        <div>
          <h2>Pending Approvals</h2>
          <div>
            <h3>Tutors</h3>
            {tutors.map(tutor => (
              <div key={tutor.id} style={{ padding: '10px', border: '1px solid #ddd', marginBottom: '10px' }}>
                <p>Name: {tutor.name}</p>
                <p>Education: {tutor.education}</p>
                <button onClick={() => approveUser('tutor', tutor.id)}>Approve</button>
              </div>
            ))}
          </div>
          <div>
            <h3>Students</h3>
            {students.map(student => (
              <div key={student.id} style={{ padding: '10px', border: '1px solid #ddd', marginBottom: '10px' }}>
                <p>Name: {student.name}</p>
                <p>Education: {student.education}</p>
                <button onClick={() => approveUser('student', student.id)}>Approve</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'batches' && (
        <div>
          <h2>Batches</h2>
          {batches.map(batch => (
            <div key={batch.id} style={{ padding: '10px', border: '1px solid #ddd', marginBottom: '10px' }}>
              <h3>{batch.name}</h3>
              <p>Students: {batch.students.length}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}