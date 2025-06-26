import React, { useState, useEffect } from 'react';
import { getBatchesForTutor, markAttendance, uploadResource } from '../api';

const Tutor = ({ user }) => {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [attendance, setAttendance] = useState({
    date: new Date().toISOString().split('T')[0],
    status: 'PRESENT',
    remarks: ''
  });
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    resourceType: 'DOCUMENT',
    file: null
  });

  useEffect(() => {
    const fetchBatches = async () => {
      const batchList = await getBatchesForTutor(user.id);
      setBatches(batchList);
    };
    fetchBatches();
  }, [user.id]);

  const handleMarkAttendance = async (studentId) => {
    await markAttendance({
      studentId,
      batchId: selectedBatch.id,
      date: attendance.date,
      status: attendance.status,
      remarks: attendance.remarks
    });
    alert('Attendance marked successfully');
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', newResource.file);
    formData.append('title', newResource.title);
    formData.append('description', newResource.description);
    formData.append('batchId', selectedBatch.id);
    formData.append('resourceType', newResource.resourceType);
    
    await uploadResource(formData);
    alert('Resource uploaded successfully');
    setNewResource({
      title: '',
      description: '',
      resourceType: 'DOCUMENT',
      file: null
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#4a5568', marginBottom: '30px' }}>Tutor Dashboard</h1>
      
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
            <h2 style={{ color: '#4a5568', marginBottom: '15px' }}>Mark Attendance for {selectedBatch.name}</h2>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Date</label>
              <input
                type="date"
                value={attendance.date}
                onChange={(e) => setAttendance({...attendance, date: e.target.value})}
                style={{
                  padding: '8px',
                  borderRadius: '5px',
                  border: '1px solid #e2e8f0'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Status</label>
              <select
                value={attendance.status}
                onChange={(e) => setAttendance({...attendance, status: e.target.value})}
                style={{
                  padding: '8px',
                  borderRadius: '5px',
                  border: '1px solid #e2e8f0',
                  width: '100%'
                }}
              >
                <option value="PRESENT">Present</option>
                <option value="ABSENT">Absent</option>
                <option value="LATE">Late</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Remarks</label>
              <input
                type="text"
                value={attendance.remarks}
                onChange={(e) => setAttendance({...attendance, remarks: e.target.value})}
                style={{
                  padding: '8px',
                  borderRadius: '5px',
                  border: '1px solid #e2e8f0',
                  width: '100%'
                }}
              />
            </div>
            
            <h3 style={{ marginBottom: '15px' }}>Students</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
              {selectedBatch.students?.map(student => (
                <div key={student.id} style={{
                  padding: '15px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '5px',
                  background: '#f7fafc'
                }}>
                  <h4 style={{ margin: '0 0 10px' }}>{student.firstName} {student.lastName}</h4>
                  <button
                    onClick={() => handleMarkAttendance(student.id)}
                    style={{
                      padding: '5px 10px',
                      background: '#48bb78',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Mark {attendance.status.toLowerCase()}
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '5px', background: '#fff' }}>
            <h2 style={{ color: '#4a5568', marginBottom: '15px' }}>Upload Resource for {selectedBatch.name}</h2>
            
            <form onSubmit={handleFileUpload}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Title</label>
                <input
                  type="text"
                  value={newResource.title}
                  onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                  style={{
                    padding: '8px',
                    borderRadius: '5px',
                    border: '1px solid #e2e8f0',
                    width: '100%'
                  }}
                  required
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description</label>
                <textarea
                  value={newResource.description}
                  onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                  style={{
                    padding: '8px',
                    borderRadius: '5px',
                    border: '1px solid #e2e8f0',
                    width: '100%',
                    minHeight: '80px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Resource Type</label>
                <select
                  value={newResource.resourceType}
                  onChange={(e) => setNewResource({...newResource, resourceType: e.target.value})}
                  style={{
                    padding: '8px',
                    borderRadius: '5px',
                    border: '1px solid #e2e8f0',
                    width: '100%'
                  }}
                >
                  <option value="DOCUMENT">Document</option>
                  <option value="VIDEO">Video</option>
                  <option value="LINK">Link</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>File</label>
                <input
                  type="file"
                  onChange={(e) => setNewResource({...newResource, file: e.target.files[0]})}
                  style={{
                    padding: '8px',
                    borderRadius: '5px',
                    border: '1px solid #e2e8f0',
                    width: '100%'
                  }}
                  required
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
                Upload Resource
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Tutor;