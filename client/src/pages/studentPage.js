import React, { useState, useEffect } from 'react';
import { useQuery} from "@apollo/client";
import { GET_USERS } from '../utils/queries';

// import studentCard from 'src/sections/@dashboard/students/studentCard';

// import { useQuery } from 'react-query';

function StudentsPage() {
  const { isLoading, data, error } = useQuery(GET_USERS);
  console.log(data)
  const [students, setStudents] = useState || [];

  useEffect(() => {
    if (data) {
      setStudents(data.students);
    }
  }, [data]);
  
  return (
    <div>
      <h1 className='student-list'>LIST OF STUDENTS</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className="student-container">
        {students.map(student => (
          <div key={student.firstName} className="project-card">
            <h2 className='lastname'>{student.lastName}</h2>
            <h2 className='email'>{student.email}</h2>
            <h2 className='dateJoined'>{student.dateJoined}</h2>
            <h2 className='status'>{student.status}</h2>
            <h2 className='role'>{student.role}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentsPage;
