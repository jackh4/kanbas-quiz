import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: <any>([]),
  quiz: {
    title: "Quiz",
    description: "",
    quizType: "Graded Quiz",
    points: 0,
    assignmentGroup: "",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: true,
    // show correct answers both boolean and date
    showCorrectAnswers: "",
    accessCode: "",
    oneQuestionPerTime: true,
    webcamRequired: true,
    lockQuestions: true,
    dueDate: Date(),
    availableDate: Date(),
    untilDate: Date(),
    questions: [],
    published: false,
    course: "",
		previewAnswers: [],
  },
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    addQuiz: (state, action) => {
      state.quizzes = [action.payload, ...state.quizzes];
    },
    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz: any) => {
        if (quiz._id === action.payload._id) {
          return action.payload;
        } else {
          return quiz;
        }
      })
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz: any) => quiz._id !== action.payload._id
      );
    },
  },
});

export const { setQuizzes, setQuiz, addQuiz, updateQuiz, deleteQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;