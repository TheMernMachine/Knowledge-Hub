import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import AssignmentPage from './pages/AssignmentsPage';
import SingleAssignmentPage from './pages/SingleAssignmentPage';
import NewAssignmentForm from './components/forms/NewAssignmentForm';
import QuizzesPage from './pages/Quizzes';
import QuizPage from './pages/SingleQuiz';
import NewQuizForm from './components/forms/NewQuizForm';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import CoursesPage from './pages/CoursesPage';
import CoursePage from './pages/CoursePage';
import CoursePayment from './pages/coursePayment';
import LandingPage from './pages/LandingPage';
import StudentsPage from './pages/studentPage';
import StudentDetails from './pages/StudentDetails';
import ComingSoon from './pages/ComingSoon';


// ----------------------------------------------------------------------

export default function Router() {
  
  const routes = useRoutes([
    {
      path: '/',
      element: <LandingPage />,
      children: [
        { element: <Navigate to='/home' />, index: true },
        { path: 'home', element: <LandingPage /> },
      ],
    },
    {
      path: 'dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'courses', element: <CoursesPage /> },
        { path: 'course/:_id', element: <CoursePage />,
          children: [
            { path: 'register', element: <CoursePayment /> },
          ]
        },
        { path: 'assignments', element: <AssignmentPage /> },
        { path: 'assignment/:_id', element: <SingleAssignmentPage /> },
        { path: 'assignments/new', element: <NewAssignmentForm />},
        { path: 'quizzes', element: <QuizzesPage /> },
        { path: 'quiz/:_id', element: <QuizPage /> },
        { path: 'quizzes/new', element: <NewQuizForm />},
        { path: 'students', element: <StudentsPage /> },
        { path: 'StudentDetails/:_id', element: <StudentDetails /> },
        { path: 'coming-soon', element: <ComingSoon /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
