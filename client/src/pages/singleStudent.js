// import { Helmet } from 'react-helmet-async';
// import { useQuery } from '@apollo/client';
// import { useParams } from 'react-router-dom';
// import { Container, Typography } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { GET_USER } from '../utils/queries';

// const theme = createTheme();

// export default function SingleStudent() {
//     const { _id: userId } = useParams();
//     console.log(userId);
//     const { loading, data } = useQuery(GET_USER,
//         { variables: { id: `${userId}` } });
//     const user = data?.user || [];
//     console.log(user);

//     return (
//         <>
//             <Helmet>
//                 <title>Student Page </title>
//             </Helmet>

//             <ThemeProvider theme={theme}>
//                 <Container maxWidth="lg">

//                     <AssignmentPostCard key={user._id} user={assignment} index={0} />

//                     <Typography variant="h3" align='center' pt={10} color='primary.darker' >
//                         {user.title}
//                     </Typography>
//                     <Typography variant="h6" align='center' fontStyle={'italic'} color='primary.main' >
//                         student's name:
//                     </Typography>
//                     <Typography variant="h6" align='center' underline='always'>
//                         {user.dueDate}
//                     </Typography>
//                     <Typography variant="h5" align='center' pt={3} fontStyle={'italic'} color='primary.main' >
//                         This Assignment's Instructions:
//                     </Typography>
//                     <Typography variant="h6" align='center' >
//                         {assignment.question}
//                     </Typography>
//                     <SubmitForm type={'Assignment'} />
//                 </Container>

//             </ThemeProvider>


//         </>
//     );
// }
















// import React, { useState, useEffect } from 'react';
// import '../assets/style.css'
// import { useQuery } from '@apollo/client';
// import { GET_USER } from '../utils/queries';



// //  DATA ISN'T SHOWING UP ON THE PAGE
// function SingleStudent() {
//   const { loading, data, error } = useQuery(GET_USER);
//   const [student, setStudent] = data?.student || [];
  
//   console.log(data)
//   useEffect(() => {
//     if (data) {
//       setStudent(data.student);
//     }
//   }, [data]);
  
//   return (
//     <div>
//       <h1>{student.firstName}{student.lastName}</h1>
//       {loading && <p>Loading...</p>}
//       {error && <p>Error: {error.message}</p>}
//       <div>
//         {student.map(student => (
//           <div key={student.id}>
//             <h1>{student.firstName}{student.lastName}</h1>
//             <p>{student.email}</p>
//             <p>{student.dateJoined}</p>
//             <h2>{student.status}</h2>
//             <h3>{student.role}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default SingleStudent;