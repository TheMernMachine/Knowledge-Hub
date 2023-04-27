import { gql } from '@apollo/client';

// User queries
export const GET_USERS = gql`
  query users {
    users {
      _id
      firstName
      lastName
      fullName
      email
      dateJoined
      status
      role {
        _id
        name
        permissions
      }
      todoLists {
        _id
        title
        todo
        priority
      }
    }
  }
`;

export const GET_USER = gql`
  query user($userId: ID!) {
    user(_id: $Id) {
      _id
      firstName
      lastName
      fullName
      email
      dateJoined
      status
      role {
        _id
        name
        permissions
      }
      todoLists {
        _id
        title
        todo
        priority
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
      dateJoined
      status
      role {
        _id
        name
        permissions
      }
      todoLists {
        priority
        todo
        title
        _id
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
    role(_id: $Id) {
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
      priority
    }
  }
`;

export const GET_TODOLIST = gql`
  query getTodoList($todolistId: ID!) {
    getTodoList(_id: $Id) {
      _id
      title
      todo
      priority
    }
  }
`;

// Assignment queries
export const GET_ASSIGNMENTS = gql`
query assignments {
  assignments {
    _id
    title
    question
    dueDate
    alert {
      _id
      message
      severity
    }
    assignmentResponse {
      _id
      responseText
      student
      rawScore
      grade
    }
  }
}
`;

export const GET_ASSIGNMENT = gql`
  query assignment($id: ID!) {
    assignment(_id: $id) {
      _id
      title
      question
      dueDate
      alert {
        _id
        message
        severity
      }
      assignmentResponse {
        _id
        responseText
        student
        rawScore
        grade
      }
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
      price
      quiz {
        _id
        title
        questions {
          _id
          title
          options
          answer
        }
        due_date
        quizResponse {
          _id
          responseText
          student
          rawScore
          grade
        }
      }
      assignment {
        _id
        title
        question
        due_date
        alert {
          _id
          message
          severity
        }
        assignmentResponse {
          _id
          responseText
          student
          rawScore
          grade
        }
      }
      lessonNotes {
        _id
        title
        content
        createdAt
        updatedAt
        comments {
          _id
          commentText
          commentAuthor
          createdAt
          updatedAt
        }
      }
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
      price
      quiz {
        _id
        title
        questions {
          _id
          title
          options
          answer
        }
        due_date
        quizResponse {
          _id
          responseText
          student
          rawScore
          grade
        }
      }
      assignment {
        _id
        title
        question
        due_date
        alert {
          _id
          message
          severity
        }
        assignmentResponse {
          _id
          responseText
          student
          rawScore
          grade
        }
      }
      lessonNotes {
        _id
        title
        content
        createdAt
        updatedAt
        comments {
          _id
          commentText
          commentAuthor
          createdAt
          updatedAt
        }
      }
      startDate
      endDate
    }
  }
`;

export const GET_QUIZZES = gql`
  query quizzes {
    getQuiz {
      _id
      title
      questions {
        _id
        title
        options
        answer
      }
      dueDate
      quizResponse {
        _id
        responses
        student
        rawScore
        grade
      }
    }
  }
`;

export const GET_QUIZ = gql`
  query quiz($id: ID!) {
    getSingleQuiz(_id: $id) {
      _id
      title
      questions {
        _id
        title
        options
        answer
      }
      dueDate
      quizResponse {
        _id
        responses
        student
        rawScore
        grade
      }
    }
  }
`;



