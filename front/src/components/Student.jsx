import React, { useState, useEffect } from 'react';
import { getBatchesForStudent, getAttendance, getBatchResources } from '../api';

const Student = ({ user }) => {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [resources, setResources] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const fetchBatches = async () => {
      const batchList = await getBatchesForStudent(user.id);
      setBatches(batchList);
      if (batchList.length > 0) {
        setSelectedBatch(batchList[0]);
      }
    };
    fetchBatches();
  }, [user.id]);

  useEffect(() => {
    if (selectedBatch) {
      const fetchData = async () => {
        const attendanceData = await getAttendance(user.id, dateRange.startDate, dateRange.endDate);
        const resourceData = await getBatchResources(selectedBatch.id);
        setAttendance(attendanceData);
        setResources(resourceData);
      };
      fetchData();
    }
  }, [selectedBatch, dateRange, user.id]);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#4a5568', marginBottom: '30px' }}>Student Dashboard</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#4a5568', marginBottom: '15px' }}>My Batches</h2>
        {batches.length > 0 ? (
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            {batches.map(batch => (
              <div 
                key={batch.id} 
                onClick={() => setSelectedBatch(batch)}
                style={{
                  padding: '15px',
                  border: `2px solid ${selectedBatch?.id === batch.id ? '#4299e1' : '#e2e8f0'}`,
                  borderRadius: '5px',
                  background: '#fff',
                  cursor: 'pointer',
                  minWidth: '200px'
                }}
              >
                <h3 style={{ margin: '0 0 10px' }}>{batch.name}</h3>
                <p style={{ margin: '0', color: '#718096' }}>{batch.description}</p>
              </div>
            ))}
          </div>
        ) : <p>No batches assigned yet</p>}
      </div>
      
      {selectedBatch && (
        <>
          <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '5px', background: '#fff' }}>
            <h2 style={{ color: '#4a5568', marginBottom: '15px' }}>My Attendance</h2>
            
            <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Start Date</label>
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                  style={{
                    padding: '8px',
                    borderRadius: '5px',
                    border: '1px solid #e2e8f0'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>End Date</label>
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                  style={{
                    padding: '8px',
                    borderRadius: '5px',
                    border: '1px solid #e2e8f0'
                  }}
                />
              </div>
            </div>
            
            {attendance.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f7fafc' }}>
                      <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Date</th>
                      <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Status</th>
                      <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.map(record => (
                      <tr key={record.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '10px' }}>{new Date(record.date).toLocaleDateString()}</td>
                        <td style={{ 
                          padding: '10px',
                          color: record.status === 'PRESENT' ? '#48bb78' : 
                                 record.status === 'ABSENT' ? '#f56565' : '#ed8936'
                        }}>
                          {record.status}
                        </td>
                        <td style={{ padding: '10px' }}>{record.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : <p>No attendance records found</p>}
          </div>
          
          <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '5px', background: '#fff' }}>
            <h2 style={{ color: '#4a5568', marginBottom: '15px' }}>Batch Resources</h2>
            
            {resources.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {resources.map(resource => (
                  <div key={resource.id} style={{
                    padding: '15px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '5px',
                    background: '#f7fafc'
                  }}>
                    <h3 style={{ margin: '0 0 10px' }}>{resource.title}</h3>
                    <p style={{ margin: '0 0 10px', color: '#718096' }}>{resource.description}</p>
                    <p style={{ margin: '0 0 10px', fontSize: '14px', color: '#a0aec0' }}>
                      Type: {resource.resourceType.toLowerCase()} | Uploaded: {new Date(resource.createdAt).toLocaleDateString()}
                    </p>
                    <a
                      href={`/api/files/download/${resource.filePath}`}
                      style={{
                        display: 'inline-block',
                        padding: '8px 15px',
                        background: '#4299e1',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '5px'
                      }}
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            ) : <p>No resources available for this batch</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default Student;