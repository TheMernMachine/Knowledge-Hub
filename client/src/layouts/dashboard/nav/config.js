// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfigTeacher = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'students',
    path: '/dashboard/students',
    icon: icon('ic_user'),
  },
  {
    title: 'courses',
    path: '/dashboard/courses',
    icon: icon('ic_blog'),
  },
  {
    title: 'assignments',
    path: '/dashboard/assignments',
    icon: icon('ic_blog'),
  },
  {
    title: 'quizzes',
    path: '/dashboard/quizzes',
    icon: icon('ic_blog'),
  },
  {
    title: 'forum',
    path: '/dashboard/coming-soon',
    icon: icon('ic_user'),
  },
  {
    title: 'lesson notes',
    path: '/dashboard/coming-soon',
    icon: icon('ic_blog'),
  },
];

const navConfigStudent = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'courses',
    path: '/dashboard/courses',
    icon: icon('ic_blog'),
  },
  {
    title: 'assignments',
    path: '/dashboard/assignments',
    icon: icon('ic_blog'),
  },
  {
    title: 'quizzes',
    path: '/dashboard/quizzes',
    icon: icon('ic_blog'),
  },
  {
    title: 'lesson notes',
    path: '/dashboard/coming-soon',
    icon: icon('ic_blog'),
  },
  {
    title: 'grades',
    path: '/dashboard/coming-soon',
    icon: icon('ic_analytics'),
  },
  {
    title: 'forum',
    path: '/dashboard/coming-soon',
    icon: icon('ic_user'),
  },

];

export { navConfigTeacher, navConfigStudent };
