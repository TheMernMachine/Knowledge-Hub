import { gql } from '@apollo/client';


// User queries
export const GET_USERS = gql`
  query users {
    users {
      _id
      firstName
      lastName
      email
      role {
        _id
        name
        permissions
      }
      todolists {
        _id
        title
        todo
      }
    }
  }
`;

export const GET_USER = gql`
  query user($userId: ID!) {
    user(_id: $userId) {
      _id
      firstName
      lastName
      email
      role {
        _id
        name
        permissions
      }
      todolists {
        _id
        title
        todo
      }
    }
  }
`;

export const GET_ME = gql`
  query me {
    me {
      _id
      firstName
      lastName
      email
      role {
        _id
        name
        permissions
      }
      todolists {
        _id
        title
        todo
      }
    }
  }
`;

// Roles queries
export const GET_ROLES = gql`
  query roles {
    roles {
      _id
      name
      permissions
    }
  }
`;

export const GET_ROLE = gql`
  query role($roleId: ID!) {
    role(_id: $roleId) {
      _id
      name
      permissions
    }
  }
`;

// TodoList queries
export const GET_TODOLISTS = gql`
  query todolists {
    todolists {
      _id
      title
      todo
    }
  }
`;

export const GET_TODOLIST = gql`
  query getTodoList($todolistId: ID!) {
    getTodoList(_id: $todolistId) {
      _id
      title
      todo
    }
  }
`;

// Assignment queries
export const GET_ASSIGNMENTS = gql`
  query assignments {
    assignments {
      _id
      title
      description
      dueDate
      alert
      assignmentResponse
    }
  }
`;

export const GET_ASSIGNMENT = gql`
  query assignment($assignmentId: ID!) {
    assignment(_id: $assignmentId) {
      _id
      title
      description
      dueDate
      alert
      assignmentResponse
    }
  }
`;

// Course queries
export const GET_COURSES = gql`
  query courses {
    courses {
      _id
      title
      description
      content
      startDate
      endDate
    }
  }
`;

export const GET_COURSE = gql`
  query course($courseId: ID!) {
    course(_id: $courseId) {
      _id
      title
      description
      content
      startDate
      endDate
    }
  }
`;



