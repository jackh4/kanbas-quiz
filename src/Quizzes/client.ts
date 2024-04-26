import axios from "axios";

axios.defaults.withCredentials = true;
export const BASE_API = process.env.REACT_APP_API_BASE;
export const QUIZZES_API = `${BASE_API}/api/quizzes`;
export interface Question {
  title: string,
  type: string,
  points: number,
  question: string,
  choices: [string],
  // Schema.Types.Mixed - String + Boolean
  correctAnswer: string | boolean,
  blanks: {
    position: number,
    correctAnswer: string,
  }[],
}
export interface Quiz {
  _id: string,
  title: string,
  description: string,
  quizType: string,
  points: number,
  assignmentGroup: string,
  shuffleAnswers: boolean,
  timeLimit: number,
  multipleAttempts: boolean,
  // show correct answers both boolean and date
  showCorrectAnswers: string,
  accessCode: string,
  oneQuestionPerTime: boolean,
  webcamRequired: boolean,
  lockQuestions: boolean,
  dueDate: string,
  availableDate: string,
  untilDate: string,
  questions: Question[],
  published: boolean
  course: string,
};
export const findAllCourseQuizzes = async (courseId: any) => {
  const response = await axios.get(`${QUIZZES_API}/${courseId}`);
  return response.data;
};
// export const findQuizByTitle = async (title: any) => {
//   const response = await axios.get(`${QUIZZES_API}/${title}`);
//   return response.data;
// }
export const findQuizByTitleCourse = async (courseId: any, title: any) => {
  const response = await axios.get(`${QUIZZES_API}/${courseId}/${title}`);
  return response.data;
}
export const createQuiz = async (quiz: any) => {
  const response = await axios.post(`${QUIZZES_API}`, quiz);
  return response.data;
};
export const updateQuiz = async (quiz: any) => {
  const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return response.data;
};
export const deleteQuiz = async (quiz: any) => {
  const response = await axios.delete(`${QUIZZES_API}/${quiz._id}`);
  return response.data;
};