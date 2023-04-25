import { gql } from '@apollo/client';

// User mutations
export const ADD_USER = gql`
  mutation addUser($firstName: String, $lastName: String, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }     
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($firstName: String, $lastName: String, $email: String, $password: String) {
    updateUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      _id
      firstName
      lastName
      email
    }
  }
`;

// Assignment mutations
export const ADD_ASSIGNMENT = gql`
  mutation addAssignment($title: String!, $description: String!, $dueDate: String!, $course: String!) {
    addAssignment(title: $title, description: $description, dueDate: $dueDate, course: $course) {
      _id
      title
      description
      dueDate
      course
    }
  }
`;

export const UPDATE_ASSIGNMENT = gql`
  mutation updateAssignment($assignmentId: ID!, $title: String!, $description: String!, $dueDate: String!, $alert: String, $assignmentResponse: String) {
    updateAssignment(assignmentId: $assignmentId, title: $title, description: $description, dueDate: $dueDate, alert: $alert, assignmentResponse: $assignmentResponse) {
      _id
      title
      description
      dueDate
      course
    }
  }
`;

export const DELETE_ASSIGNMENT = gql`
  mutation deleteAssignment($assignmentId: ID!) {
    deleteAssignment(assignmentId: $assignmentId) {
      _id
      title
      description
      dueDate
      course
    }
  }
`;

// Todo mutations
export const ADD_TODO_LIST = gql`
  mutation addTodoList($title: String!, $todos: [TodoInput]!) {
    addTodoList(title: $title, todos: $todos) {
      _id
      title
      todo
    }
  }
`;

export const UPDATE_TODO_LIST = gql`
  mutation updateTodoList($todoListId: ID!, $title: String!, $todos: [TodoInput]!) {
    updateTodoList(todoListId: $todoListId, title: $title, todos: $todos) {
      _id
      title
      todo
    }
  }
`;

export const DELETE_TODO_LIST = gql`
  mutation deleteTodoList($todoListId: ID!) {
    deleteTodoList(todoListId: $todoListId) {
      _id
      title
      todo
    }
  }
`;

// Alert mutations
export const ADD_ALERT = gql`
  mutation addAlert($message: String!, $severity: String!) {
    addAlert(message: $message, severity: $severity) {
      _id
      message
      severity
    }
  }
`;

export const REMOVE_ALERT = gql`
  mutation removeAlert($alertId: ID!) {
    removeAlert(alertId: $alertId) {
      _id
      message
      severity
    }
  }
`;

export const UPDATE_ALERT = gql`
  mutation updateAlert($alertId: ID!, $message: String!, $severity: String!) {
    updateAlert(alertId: $alertId, message: $message, severity: $severity) {
      _id
      message
      severity
    }
  }
`;

// Course mutations
export const ADD_COURSE = gql`
  mutation addCourse($title: String!, $description: String!, $content: [String]!, $startDate: String!, $endDate: String!) {
    addCourse(title: $title, description: $description, content: $content, startDate: $startDate, endDate: $endDate) {
      _id
      title
      description
      content
      startDate
      endDate
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation updateCourse($courseId: ID!, $title: String!, $description: String!, $content: [String]!, $startDate: String!, $endDate: String!) {
    updateCourse(courseId: $courseId, title: $title, description: $description, content: $content, startDate: $startDate, endDate: $endDate) {
      _id
      title
      description
      content
      startDate
      endDate
    }
  }
`;

export const DELETE_COURSE = gql`
  mutation deleteCourse($courseId: ID!) {
    deleteCourse(courseId: $courseId) {
      _id
      title
      description
      content
      startDate
      endDate
    }
  }
`;

// Role mutations
export const ADD_ROLE = gql`
  mutation addRole($title: String!, $description: String!) {
    addRole(title: $title, description: $description) {
      _id
      title
      description
    }
  }
`;

export const UPDATE_ROLE = gql`
  mutation updateRole($roleId: ID!, $title: String!, $description: String!) {
    updateRole(roleId: $roleId, title: $title, description: $description) {
      _id
      title
      description
    }
  }
`;

export const DELETE_ROLE = gql`
  mutation deleteRole($roleId: ID!) {
    deleteRole(roleId: $roleId) {
      _id
      title
      description
    }
  }
`;