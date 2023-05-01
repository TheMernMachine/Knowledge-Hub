import { gql } from '@apollo/client';

// User mutations
export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $role: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, role: $role) {
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
      role {
        _id
        name
      }
    }
  }
`;

// Assignment mutations
export const ADD_ASSIGNMENT = gql`
  mutation addAssignment($title: String!, $question: String!, $dueDate: String!, $courseId: ID!) {
    addAssignment(title: $title, question: $question, dueDate: $dueDate, course: $courseId) {
      _id
      title
      question
      alert {
        _id
        message
        severity
      }
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
      assignmentResponse {
        _id
      }
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
      assignmentResponse {
        _id
      }
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
      assignmentResponse {
        _id
      }
    }
  }
`;

export const GRADE_ASSIGNMENT_RESPONSE = gql`
  mutation gradeAssignmentResponse($assignmentId: ID!, $responseId: ID!, $rawScore: Int!) {
    gradeAssignmentResponse(assignmentId: $assignmentId, responseId: $responseId, rawScore: $rawScore) {
      _id
      title
      question
      dueDate
      assignmentResponse {
        _id
      }
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
  mutation addTodoList($userId: ID!,$title: String!, $todo: String!, $priority: String!) {
    addTodoList(userId: $userId, title: $title, todo: $todo, priority: $priority) {
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
  mutation addCourse($title: String!, $description: String!, $startDate: String!, $endDate: String!, $price: Float!, $teacher: [ID]!) {
    addCourse(title: $title, description: $description, startDate: $startDate, endDate: $endDate, price: $price, teacher: $teacher) {
      _id
      title
      description
      quiz {
        _id
      }
      assignment {
        _id
      }
      lessonNotes {
        _id
      }
      price
      startDate
      endDate
      teacher {
        _id
      }
      students {
        _id
      }
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation updateCourse($courseId: ID!, $title: String, $description: String, $startDate: String, $endDate: String!, $price: Float) {
    updateCourse(_id: $courseId, title: $title, description: $description, startDate: $startDate, endDate: $endDate, price: $price) {
      _id
      title
      description
      quiz {
        _id
      }
      assignment {
        _id
      }
      lessonNotes {
        _id
      }
      price
      startDate
      endDate
      teacher {
        _id
      }
      students {
        _id
      }
    }
  }
`;

export const ADD_STUDENT_TO_COURSE = gql`
  mutation addStudentToCourse($courseId: ID!, $studentId: ID!) {
    addStudentToCourse(courseId: $courseId, studentId: $studentId) {
      _id
      title
      description
      quiz {
        _id
      }
      assignment {
        _id
      }
      lessonNotes {
        _id
      }
      price
      startDate
      endDate
      teacher {
        _id
      }
      students {
        _id
      }
    }
  }
`;

export const DELETE_COURSE = gql`
  mutation deleteCourse($courseId: ID!) {
    deleteCourse(_id: $courseId) {
      _id
      title
      description
      quiz {
        _id
      }
      assignment {
        _id
      }
      lessonNotes {
        _id
      }
      price
      startDate
      endDate
      teacher {
        _id
      }
      students {
        _id
      }
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
  mutation addLessonNotes($title: String!, $content: String!, $courseId: ID!) {
    addLessonComment(title: $title, content: $content, courseId: $courseId) {
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

// deleteLessonNotes(_id: ID!): LessonNotes;
export const DELETE_LESSON_NOTES = gql`
  mutation deleteLessonNotes($lessonId: ID!) {
    deleteLessonNotes(_id: $lessonId) {
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
}`;

// Lesson Comment mutations
export const ADD_LESSON_COMMENT = gql`
  mutation addLessonComment($lessonId: ID!, $commentText: String!, $authorId: ID!) {
    addLessonComment(_id: $lessonId, commentText: $commentText, commentAuthor: $authorId) {
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

export const UPDATE_LESSON_COMMENT = gql`
  mutation updateLessonComment($lessonId: ID!, $commentId: ID!, $commentText: String!) {
    updateLessonComment(_id: $lessonId, commentId: $commentId, commentText: $commentText) {
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

export const DELETE_LESSON_COMMENT = gql`
  mutation deleteLessonComment($lessonId: ID!, $commentId: ID!) {
    deleteLessonComment(_id: $lessonId, commentId: $commentId) {
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
  mutation updateForum($forumId: ID!, $title: String, $postQuestion: String, $authorId: ID!) {
    updateForum(_id: $forumId, title: $title, postQuestion: $postQuestion, postAuthor: $authorId) {
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

export const DELETE_FORUM = gql`
  mutation deleteForum($forumId: ID!) {
    deleteForum(_id: $forumId) {
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


// Forum Comment mutations
export const ADD_FORUM_COMMENT = gql`
  mutation addForumComment($forumId: ID!, $commentText: String!, $authorId: ID!) {
    addForumComment(_id: $forumId, commentText: $commentText, commentAuthor: $authorId) {
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

export const UPDATE_FORUM_COMMENT = gql`
  mutation updateForumComment($forumId: ID!, $commentId: ID!, $commentText: String) {
    updateForumComment(_id: $forumId, commentId: $commentId, commentText: $commentText) {
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

export const DELETE_FORUM_COMMENT = gql`
  mutation deleteForumComment($forumId: ID!, $commentId: ID) {
    deleteForumComment(_id: $forumId, commentId: $commentId) {
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


// Quiz mutations
export const ADD_QUIZ = gql`
  mutation addQuiz($title: String!, $dueDate: String!, $courseId: ID!) {
    addQuiz(title: $title, dueDate: $dueDate, courseId: $courseId) {
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

export const UPDATE_QUIZ = gql`
  mutation updateQuiz($quizId: ID!, $title: String, $dueDate: String) {
    updateQuiz(_id: $quizId, title: $title, dueDate: $dueDate) {
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

export const DELETE_QUIZ = gql`
  mutation deleteQuiz($quizId: ID!, $courseId: ID) {
    deleteQuiz(_id: $quizId, courseId: $courseId) {
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

export const ADD_QUIZ_RESPONSE = gql`
  mutation addQuizResponse($quizId: ID!, $responses: [String]!, $student: ID!, $rawScore: Float!) { addQuizResponse(quizId: $quizId, responses: $responses, student: $student, rawScore: $rawScore) {
    _id
    responses
    student
    rawScore
    grade
  }
}
`;


// Quiz Question mutations
export const ADD_QUIZ_QUESTION = gql`
  mutation addQuizQuestion($quizId: ID!, $title: String!, $options: [String]!, $answer: String!) {
    addQuizQuestion(_id: $quizId, title: $title, options: $options, answer: $answer) {
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

export const UPDATE_QUIZ_QUESTION = gql`
  mutation updateQuizQuestion($quizId: ID!, $questionId: ID!, $title: String, , $options: [String], $answer: String) {
    updateQuizQuestion(_id: $quizId, questionId: $questionId, title: $title, options: $options, answer: $answer) {
      _id
      title
      questions {
        _id
        title
        options
        answer
      }
      dueDate
    }
  }
`;

export const DELETE_QUIZ_QUESTION = gql`
  mutation deleteQuizQuestion($quizId: ID!, $questionId: ID) {
    deleteQuizQuestion(_id: $quizId, questionId: $questionId) {
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