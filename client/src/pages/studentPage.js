import React, { useState, useEffect } from 'react';
// import { useQuery} from "@apollo/client";
// import { GET_USERS } from '../utils/queries';
// import { graphql } from 'graphql';
// import { Link } from 'react-router-dom';
import '../assets/style.css'

const students = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'austin@gmail.com',
    dateJoined: '10/10/2021',
    status: 'active',
    role: 'student'
  }
]
  

//  DATA ISN'T SHOWING UP ON THE PAGE
function StudentsPage() {
  // const { loading, data, error } = useQuery(GET_USERS);
  // const [students, setStudents] = data?.students || [];
  
  // console.log(data)
  // useEffect(() => {
  //   if (data) {
  //     setStudents(data.students);
  //   }
  // }, [data]);
  
  return (
    <div>
      <h1 className='student-list'>LIST OF STUDENTS</h1>
      {/* {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>} */}
      <div>
        {students.map(students => (
          <div key={students.id}>
            <h1>{students.firstName}{students.lastName}</h1>
            <p>{students.email}</p>
            <p>{students.dateJoined}</p>
            <h2>{students.status}</h2>
            <h3>{students.role}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentsPage;