import { gql } from '@apollo/client';

// User queries
export const GET_USERS = gql`
  query users {
    users {
      _id
      firstName
      lastName
      username
      email
      students{
        _id
        firstName
        lastName
        dateJoined
        email
      }
      teacher{
        _id
        firstName
        lastName

      }
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

// Get a single user by id
export const GET_USER = gql`
query GetUser($id: ID!) {
  getUser(_id: $id) {
    _id
    firstName
    lastName
    username
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
      username
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

// Get a single user by email

export const GET_USER_BY_EMAIL = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      firstName
      lastName
      username
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

// Get a single role by name *** Broken on Main branch ***
export const GET_ROLE_BY_NAME = gql`
query FindRoleByName($name: String!) {
  findRoleByName(name: $name) {
    _id
    name
    permissions
  }
}
`;

// TodoList queries
export const GET_TODOLISTS = gql`
  query getAllTodoLists {
    getAllTodoLists {
      _id
      title
      todo
      priority
    }
  }
`;

// Get a single todo list by TodoList id
export const GET_SINGLE_TODOLIST = gql`
  query getSingleTodoList($todoId: ID!) {
    getSingleTodoList(_id: $todoId) {
      _id
      title
      todo
      priority
    }
  }
`;

// Get a single user's todo list by the user id
export const GET_USER_TODOLIST = gql`
  query getUserTodoLists($userId: ID!) {
    getUserTodoLists(_id: $userId) {
      _id
      title
      todo
      priority
    }
  }
`;

export const GET_ALL_ALERTS = gql`
  query alert {
    alert {
      _id
      message
      severity
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

// Assignment Response queries
export const GET_ASSIGNMENT_RESPONSES = gql`
  query getAllAssignmentResponse($assignmentId: ID!) {
    getAllAssignmentResponse(assignmentId: $assignmentId) {
      _id
      responseText
      student
      rawScore
      grade
    }
  }
`;

export const GET_SINGLE_ASSIGNMENT_RESPONSE = gql`
  query getSingleAssignmentResponse($responseId: ID!, $assignmentId: ID!) {
    getSingleAssignmentResponse(_id: $responseId, assignmentId: $assignmentId) {
      _id
      responseText
      student
      rawScore
      grade
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
        dueDate
        quizResponse {
          _id
          responses
          student
          rawScore
          grade
        }
      }
      assignment {
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
      teacher {
        _id
        firstName
        lastName
        username
        email
        dateJoined
        status
      }
      students {
        _id
        firstName
        lastName
        username
        email
        dateJoined
        status
      }
    }
  }
`;

export const GET_USERS_COURSES = gql`
  query userCourses {
    userCourses {
      _id
      title
      description
      startDate
      endDate
      teacher {
        _id
        username
        email
      }
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
        dueDate
        quizResponse {
          _id
          responses
          student
          rawScore
          grade
        }
      }
      assignment {
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
      teacher {
        _id
        firstName
        lastName
        username
        email
        dateJoined
        status
      }
      students {
        _id
        firstName
        lastName
        username
        email
        dateJoined
        status
      }
    }
  }
`;

// Quiz queries
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

// Quiz queries
export const GET_QUIZ = gql`
  query getSingleQuiz($quizId: ID!) {
    getSingleQuiz(_id: $quizId) {
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

export const GET_SINGLE_QUIZ = gql`
  query getQuizQuestions($questionId: ID!) {
    getQuizQuestions(_id: $questionId) {
      _id
      title
      options
      answer
    }
  }
`;

// Quiz Response queries
export const GET_SINGLE_QUIZ_RESPONSE = gql`
  query getSingleQuizResponse($responseId: ID!, $quizId: ID!) {
    getSingleQuizResponse(_id: $responseId, quizId: $quizId) {
      _id
      responses
      student
      rawScore
      grade
    }
  }
`;

export const GET_ALL_QUIZ_RESPONSE = gql`
  query getAllQuizResponses($quizId: ID!) {
    getAllQuizResponses(quizId: $quizId) {
      _id
      responses
      student
      rawScore
      grade
    }
  }
`;


//  Lesson Note queries
export const GET_LESSON_NOTES = gql`
  query lessonNotes {
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
}
`;

export const GET_SINGLE_LESSON_NOTE = gql`
  query lessonNote($lessonId: ID!) {
    lessonNote(_id: $lessonId) {
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
}
`;

// Lesson Notes Comment queries
export const GET_LESSON_COMMENTS = gql`
  query getLessonComments($lessonId: ID!) {
    getLessonComments(_id: $lessonId) {
      _id
      commentText
      commentAuthor
      createdAt
      updatedAt
    }
}
`;

export const GET_SINGLE_LESSON_COMMENT = gql`
  query getSingleLessonComment($lessonId: ID!, $commentId: ID!) {
    getSingleLessonComment(_id: $lessonId, commentId: $commentId) {
      _id
      commentText
      commentAuthor
      createdAt
      updatedAt
    }
}
`;

// Forum queries
export const GET_FORUMS = gql`
  query getForums {
    getForum {
      _id
      title
      postQuestion
      postAuthor
      comments {
        _id
        commentText
        commentAuthor
        createdAt
        updatedAt
      }
    }
}
`;

export const GET_SINGLE_FORUM = gql`
  query GetSingleForum($forumId: ID!) {
    getSingleForum(_id: $forumId) {
      _id
      title
      postQuestion
      postAuthor
      comments {
        _id
        commentText
        commentAuthor
        createdAt
        updatedAt
      }
    }
}
`;

// Lesson Notes Comment queries
export const GET_FORUM_COMMENTS = gql`
  query getForumComments($forumId: ID!) {
    getForumComments(_id: $forumId) {
      _id
      commentText
      commentAuthor
      createdAt
      updatedAt
    }
}
`;

export const GET_SINGLE_FORUM_COMMENT = gql`
  query getSingleForumComment($forumId: ID!, $commentId: ID!) {
    getSingleForumComment(_id: $forumId, commentId: $commentId) {
      _id
      commentText
      commentAuthor
      createdAt
      updatedAt
    }
}
`;

export const GET_STUDENT_RESPONSES = gql`
  query GetStudentQuizResponse($quizId: ID!, $studentId: ID!) {
    getStudentQuizResponse(quizId: $quizId, studentId: $studentId) {
      _id
      responses
      student
      rawScore
      grade
    }
}
`;
