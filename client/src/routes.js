import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import AssignmentPage from './pages/AssignmentsPage';
import SingleAssignmentPage from './pages/SingleAssignmentPage';
import NewAssignmentForm from './components/forms/NewAssignmentForm';
import QuizzesPage from './pages/Quizzes';
import QuizPage from './pages/SingleQuiz';
import NewQuizForm from './components/forms/NewQuizForm';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import StudentsPage from './pages/studentPage';
import CoursePayment from './pages/coursePayment';
import LandingPage from './pages/LandingPage';
import SingleStudent from './pages/singleStudent';



// ----------------------------------------------------------------------
// test imports



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
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'course/:_id/register', element: <CoursePayment /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'assignments', element: <AssignmentPage /> },
        { path: 'assignment/:_id', element: <SingleAssignmentPage /> },
        { path: 'assignments/new', element: <NewAssignmentForm />},
        { path: 'quizzes', element: <QuizzesPage /> },
        { path: 'quiz/:_id', element: <QuizPage /> },
        { path: 'students', element: <SingleStudent /> },
        { path: 'quizzes/new', element: <NewQuizForm />},
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
