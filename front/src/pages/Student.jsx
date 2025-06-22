import { useState, useEffect } from 'react';

export default function Student({ user }) {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    if (user?.id) {
      fetch(`/api/students/${user.id}`)
        .then(res => res.json())
        .then(setStudentData);
    }
  }, [user]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Student Dashboard</h1>
      {studentData ? (
        <div>
          <p>Name: {studentData.name}</p>
          <p>Batch: {studentData.batch}</p>
          {/* Add more student details as needed */}
        </div>
      ) : (
        <p>Loading student data...</p>
      )}
    </div>
  );
}