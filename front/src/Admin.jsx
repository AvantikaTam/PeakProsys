import React, { useState } from 'react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('tutors');
  const [batchName, setBatchName] = useState('');
  
  // Mock data
  const [tutors, setTutors] = useState([
    { id: 1, name: 'John Doe', education: 'MSc Computer Science', approved: false },
    { id: 2, name: 'Jane Smith', education: 'PhD Mathematics', approved: true }
  ]);
  
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice Johnson', education: 'BSc Physics', approved: false, batch: null },
    { id: 2, name: 'Bob Williams', education: 'BA English', approved: true, batch: 'A' }
  ]);

  const [batches, setBatches] = useState(['A', 'B']);
  const [assignments, setAssignments] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const approveUser = (type, id) => {
    if (type === 'tutor') {
      setTutors(tutors.map(t => t.id === id ? {...t, approved: true} : t));
    } else {
      setStudents(students.map(s => s.id === id ? {...s, approved: true} : s));
    }
  };

  const assignBatch = (studentId, batch) => {
    setStudents(students.map(s => 
      s.id === studentId ? {...s, batch} : s
    ));
  };

  const createBatch = () => {
    if (batchName && !batches.includes(batchName)) {
      setBatches([...batches, batchName]);
      setBatchName('');
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div style={{ display: 'flex', marginBottom: '20px', flexWrap: 'wrap' }}>
        {['tutors', 'students', 'assign', 'attendance', 'batches'].map(tab => (
          <button
            key={tab}
            style={{
              padding: '10px',
              margin: '5px',
              background: activeTab === tab ? '#4CAF50' : '#f1f1f1',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'tutors' && (
        <div>
          <h3>Pending Tutor Approvals</h3>
          {tutors.filter(t => !t.approved).length > 0 ? (
            tutors.filter(t => !t.approved).map(tutor => (
              <div key={tutor.id} style={cardStyle}>
                <p><strong>Name:</strong> {tutor.name}</p>
                <p><strong>Education:</strong> {tutor.education}</p>
                <button 
                  onClick={() => approveUser('tutor', tutor.id)} 
                  style={buttonStyle}
                >
                  Approve Tutor
                </button>
              </div>
            ))
          ) : (
            <p>No pending tutor approvals</p>
          )}
        </div>
      )}

      {activeTab === 'students' && (
        <div>
          <h3>Pending Student Approvals</h3>
          {students.filter(s => !s.approved).length > 0 ? (
            students.filter(s => !s.approved).map(student => (
              <div key={student.id} style={cardStyle}>
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Education:</strong> {student.education}</p>
                <button 
                  onClick={() => approveUser('student', student.id)} 
                  style={buttonStyle}
                >
                  Approve Student
                </button>
              </div>
            ))
          ) : (
            <p>No pending student approvals</p>
          )}
        </div>
      )}

      {activeTab === 'batches' && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
              placeholder="New batch name"
              style={inputStyle}
            />
            <button onClick={createBatch} style={buttonStyle}>
              Create Batch
            </button>
          </div>
          
          {batches.map(batch => (
            <div key={batch} style={cardStyle}>
              <h4>Batch {batch}</h4>
              {students.filter(s => s.batch === batch && s.approved).length > 0 ? (
                students.filter(s => s.batch === batch && s.approved).map(student => (
                  <p key={student.id}>{student.name}</p>
                ))
              ) : (
                <p>No students in this batch</p>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'assign' && (
        <div>
          <h3>Assign Students to Batches</h3>
          {students.filter(s => s.approved && !s.batch).length > 0 ? (
            students.filter(s => s.approved && !s.batch).map(student => (
              <div key={student.id} style={cardStyle}>
                <p><strong>Student:</strong> {student.name}</p>
                <select
                  value=""
                  onChange={(e) => assignBatch(student.id, e.target.value)}
                  style={inputStyle}
                >
                  <option value="">Select batch</option>
                  {batches.map(batch => (
                    <option key={batch} value={batch}>Batch {batch}</option>
                  ))}
                </select>
              </div>
            ))
          ) : (
            <p>No students to assign</p>
          )}
        </div>
      )}

      {activeTab === 'attendance' && (
        <div>
          <h3>Attendance Records</h3>
          <div style={cardStyle}>
            <p>Attendance functionality would be implemented here</p>
            <p>View by batch, mark attendance, generate reports</p>
          </div>
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  padding: '15px',
  margin: '10px 0',
  border: '1px solid #ddd',
  borderRadius: '4px'
};

const inputStyle = {
  padding: '8px',
  margin: '5px',
  border: '1px solid #ddd',
  borderRadius: '4px'
};

const buttonStyle = {
  padding: '8px 15px',
  background: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  margin: '5px'
};