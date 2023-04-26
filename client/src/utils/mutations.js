import { gql } from '@apollo/client';

// User mutations
export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        username
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
        username
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($userId: ID!, $firstName: String, $lastName: String, $email: String, $password: String, $profilePic: String) {
    updateUser(_id: $userId, firstName: $firstName, lastName: $lastName, email: $email, password: $password, profilePic: $profilePic) {
      _id
      firstName
      lastName
      username
      email
      profilePic
    }
  }
`;

export const CHANGE_USER_STATUS = gql`
  mutation setUserStatus($adminId: ID, $userId: ID!, $status: String!) {
    setUserStatus(_id: $adminId, userId: $userId, status: $status) {
      _id
      firstName
      lastName
      username
      email
      profilePic
      role
    }
  }
`;

// Assignment mutations
export const ADD_ASSIGNMENT = gql`
  mutation addAssignment($title: String!, $question: String!, $dueDate: String!, courseId: ID!) {
    addAssignment(title: $title, question: $question, dueDate: $dueDate, course: $courseId) {
      _id
      title
      question
      alert
      dueDate
    }
  }
`;

export const UPDATE_ASSIGNMENT = gql`
  mutation updateAssignment($_id: ID!, $title: String, $question: String, $dueDate: String) {
    updateAssignment(_id: $_id, title: $title, question: $question, dueDate: $dueDate) {
      _id
      title
      question
      dueDate
      assignmentResponse
    }
  }
`;

export const DELETE_ASSIGNMENT = gql`
  mutation deleteAssignment($assignmentId: ID!, $courseId: ID!) {
    deleteAssignment(_id: $assignmentId, courseId: $courseId) {
      _id
      title
      question
      dueDate
      assignmentResponse
    }
  }
`;

export const ADD_ASSIGNMENT_RESPONSE = gql`
  mutation addAssignmentResponse($assignmentId: ID!, $responseText: String!, $student: ID!) {
    addAssignmentResponse(assignmentId: $assignmentId, responseText: $responseText, student: $student) {
      _id
      title
      question
      dueDate
      assignmentResponse
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
  mutation removeAlert($_id: ID!) {
    removeAlert(_id: $_id) {
      _id
      message
      severity
    }
  }
`;

export const UPDATE_ALERT = gql`
  mutation updateAlert($alertId: ID!, $message: String, $severity: String) {
    updateAlert(_id: $alertId, message: $message, severity: $severity) {
      _id
      message
      severity
    }
  }
`;


// Todo mutations
export const ADD_TODO_LIST = gql`
  mutation addTodoList($userId: ID!,$title: String!, $todo: String!, priority: String!) {
    addTodoList(_id: $userId, title: $title, todo: $todo, priority: $priority) {
      _id
      title
      todo
      priority
    }
  }
`;

export const UPDATE_TODO_LIST = gql`
  mutation updateTodoList($todoId: ID!, $title: String, $todo: String, $priority: String) {
    updateTodoList(_id: $todoId, title: $title, todo: $todo, priority: $priority) {
      _id
      title
      todo
      priority
    }
  }
`;

export const DELETE_TODO_LIST = gql`
  mutation deleteTodoList($todoListId: ID!) {
    deleteTodoList(_id: $todoListId) {
      _id
      title
      todo
      priority
    }
  }
`;

// Course mutations
export const ADD_COURSE = gql`
  mutation addCourse($title: String!, $description: String!, $startDate: String!, $endDate: String!, $price: Float!) {
    addCourse(title: $title, description: $description, startDate: $startDate, endDate: $endDate, price: $price) {
      _id
      title
      description
      quiz
      assignment
      lessonNotes
      price
      startDate
      endDate
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation updateCourse($courseId: ID!, $title: String, $description: String, $startDate: String, $endDate: String!, $quiz: ID, $assignment: ID, $lessonNotes: ID, $price: Float) {
    updateCourse(_id: $courseId, title: $title, description: $description, startDate: $startDate, endDate: $endDate, quiz: $quiz, assignment: $assignment, lessonNotes: $lessonNotes, price: $price) {
      _id
      title
      description
      quiz
      assignment
      lessonNotes
      price
      startDate
      endDate
    }
  }
`;

export const DELETE_COURSE = gql`
  mutation deleteCourse($courseId: ID!) {
    deleteCourse(_id: $courseId) {
      _id
      title
      description
      quiz
      assignment
      lessonNotes
      price
      startDate
      endDate
    }
  }
`;

// Role mutations
export const ADD_ROLE = gql`
  mutation addRole($name: String!, $permissions: [String]!) {
    addRole(name: $name, permissions: $permissions) {
      _id
      name
      permissions
    }
  }
`;

export const UPDATE_ROLE = gql`
  mutation updateRole($roleId: ID!, $title: String, $permissions: [String]) {
    updateRole(_id: $roleId, name: $title, permissions: $permissions) {
      _id
      name
      permissions
    }
  }
`;

export const DELETE_ROLE = gql`
  mutation deleteRole($roleId: ID!) {
    deleteRole(_id: $roleId) {
      _id
      name
      permissions
    }
  }
`;

// Lesson Notes mutations
export const ADD_LESSON_NOTES = gql`
  mutation addLessonNotes($title: String!, $content: String!) {
    addLessonComment(title: $title, content: $content) {
      _id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_LESSON_NOTES = gql`
  mutation updateLessonNotes($lessonId: ID!, $title: String, $content: String) {
    updateLessonNotes(_id: $lessonId, title: $title, content: $content) {
      _id
      title
      content
      createdAt
      updatedAt
      comments
  }
}
`;

// deleteLessonNotes(_id: ID!): LessonNotes;
export const DELETE_LESSON_NOTES = gql`
  mutation deleteLessonNotes($lessonId: ID!) {
    deleteLessonNotes(_id: $lessonId) {
      _id
      title
      content
      createdAt
      updatedAt
      comments
  }
}`;

// Lesson Comment mutations
export const ADD_LESSON_COMMENT = gql`
  mutation addLessonComment(lessonId: ID!, commentText: String!, authorId: ID!) {
    addLessonComment(_id: $lessonId, commentText: $commentText, commentAuthor: $authorId) {
      _id
      title
      content
      createdAt
      updatedAt
      comments
    }
  }
`;

export const UPDATE_LESSON_COMMENT = gql`
  mutation updateLessonComment($lessonId: ID!, $commentId: ID!, $commentText: String!) {
    updateLessonComment(_id: $lessonId, commentId: $commentId, commentText: $commentText) {
      _id
      title
      content
      createdAt
      updatedAt
      comments
    }
  }
`;

export const DELETE_LESSON_COMMENT = gql`
  mutation deleteLessonComment($lessonId: ID!, commentId: ID!) {
    deleteLessonComment(_id: $lessonId, commentId: $commentId) {
      _id
      title
      content
      createdAt
      updatedAt
      comments
    }
  }
`;

// Forum mutations
export const ADD_FORUM = gql`
  mutation addForum($title: String!, $postQuestion: String!, $authorId: ID!) {
    addForum(title: $title, postQuestion: $postQuestion, postAuthor: $authorId) {
      _id
      title
      postQuestion
      postAuthor
    }
  }
`;

export const UPDATE_FORUM = gql`
  mutation updateForum($forumId: ID!, $title: String, $postQuestion: String, $authorId: ID) {
    updateForum(_id: $forumId, title: $title, postQuestion: $postQuestion, postAuthor: $authorId) {
      _id
      title
      postQuestion
      postAuthor
      comments
    }
  }
`;

export const DELETE_FORUM = gql`
  mutation deleteForum(forumId: ID!) {
    deleteForum(_id: $forumId) {
      _id
      title
      postQuestion
      postAuthor
      comments
    }
  }
`;


// Forum Comment mutations
export const ADD_FORUM_COMMENT = gql`
  mutation addForumComment($forumId: ID!, $commentText: String!, $authorId: ID!) {
    addForumComment(_id: $forumId, commentText: $commentText, commentAuthor: $authorId) {
      _id
      title
      postQuestion
      postAuthor
      comments
    }
  }
`;

export const UPDATE_FORUM_COMMENT = gql`
  mutation updateForumComment($forumId: ID!, $commentId: ID, $commentText: String) {
    updateForumComment(_id: $forumId, commentId: $commentId, commentText: $commentText) {
      _id
      title
      postQuestion
      postAuthor
      comments
    }
  }
`;

export const DELETE_FORUM_COMMENT = gql`
  mutation deleteForumComment(forumId: ID!, $commentId: ID) {
    deleteForumComment(_id: $forumId, commentId: $commentId) {
      _id
      title
      postQuestion
      postAuthor
      comments
    }
  }
`;


// Quiz mutations
export const ADD_QUIZ = gql`
  mutation addQuiz($courseId: ID!, $title: String!, $dueDate: String!!) {
    addQuiz(courseId: $courseId, title: $title, dueDate: $dueDate) {
      _id
      title
      dueDate
    }
  }
`;

// updateQuiz(_id: ID!, title: String!, dueDate: String, quizResponse: String): Quiz;
export const UPDATE_QUIZ = gql`
  mutation updateQuiz($quizId: ID!, $commentId: ID, $commentText: String) {
    updateQuiz(_id: $forumId, commentId: $commentId, commentText: $commentText) {
      _id
      title
      postQuestion
      postAuthor
      comments
    }
  }
`;

// deleteQuiz(_id: ID!, courseId: ID!): Quiz;
export const DELETE_QUIZ = gql`
  mutation deleteQuiz(forumId: ID!, $commentId: ID) {
    deleteQuiz(_id: $forumId, commentId: $commentId) {
      _id
      title
      postQuestion
      postAuthor
      comments
    }
  }
`;


// Quiz Question mutations
// addQuizQuestion(_id: ID!, title: String!, options: [String]!, answer: String!): Quiz;
// updateQuizQuestion(_id: ID!, questionId: ID!, title: String!, options: [String]!, answer: String!): Quiz;
// deleteQuizQuestion(_id: ID!, questionId: ID!): Quiz;