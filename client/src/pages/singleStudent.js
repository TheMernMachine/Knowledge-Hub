import React, { useState, useEffect } from 'react';
// import { useQuery} from "@apollo/client";
// import { GET_USERS } from '../utils/queries';
// import { graphql } from 'graphql';
// import { Link } from 'react-router-dom';
import '../assets/style.css'

// const SingleStudent = [
//   {
//     firstName: 'John',
//     lastName: 'Doe',
//     email: 'austin@gmail.com',
//     dateJoined: '10/10/2021',
//     status: 'active',
//     role: 'student'
//   }
// ]
  

//  DATA ISN'T SHOWING UP ON THE PAGE
function SingleStudent() {
  const { loading, data, error } = useQuery(GET_USERS);
  const [students, setStudents] = data?.students || [];
  
  console.log(data)
  useEffect(() => {
    if (data) {
      setStudents(data.students);
    }
  }, [data]);
  
  return (
    <div>
      <h1>{student.firstName}{student.lastName}</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div>
        {student.map(student => (
          <div key={student.id}>
            <h1>{student.firstName}{student.lastName}</h1>
            <p>{student.email}</p>
            <p>{student.dateJoined}</p>
            <h2>{student.status}</h2>
            <h3>{student.role}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SingleStudent;