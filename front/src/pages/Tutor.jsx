import { useState, useEffect } from 'react';

export default function Tutor({ user }) {
  const [tutorData, setTutorData] = useState(null);
  const [assignedStudents, setAssignedStudents] = useState([]);

  useEffect(() => {
    if (user?.id) {
      fetch(`/api/tutors/${user.id}`)
        .then(res => res.json())
        .then(setTutorData);
      
      fetch(`/api/tutors/${user.id}/students`)
        .then(res => res.json())
        .then(setAssignedStudents);
    }
  }, [user]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Tutor Dashboard</h1>
      {tutorData ? (
        <div>
          <p>Name: {tutorData.name}</p>
          <p>Subject: {tutorData.subject}</p>
          <h3>Assigned Students:</h3>
          <ul>
            {assignedStudents.map(student => (
              <li key={student.id}>{student.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading tutor data...</p>
      )}
    </div>
  );
}