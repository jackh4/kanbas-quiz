import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	questions: <any>([]),
	question: {
		id: 0,
		title: "Question",
		type: "MULTIPLE_CHOICE",
		points: 0,
		question: "",
		choices: [""],
		correctAnswer: "",
		blanks: [{
			position: 0,
			correctAnswer: "",
		}],
	},
};

const questionsSlice = createSlice({
	name: "questions",
	initialState,
	reducers: {
		setQuestions: (state, action) => {
			state.questions = action.payload;
		},
		setQuestion: (state, action) => {
			state.question = action.payload;
		},
		addQuestion: (state, action) => {
			state.questions = [action.payload, ...state.questions];
		},
		updateQuestion: (state, action) => {
			state.questions = state.questions.map((question: any) => {
				if (question.id === action.payload.id) {
					return action.payload;
				} else {
					return question;
				}
			});
		},
		deleteQuestion: (state, action) => {
			state.questions = state.questions.filter(
				(question: any) => question.id !== action.payload.id
			);
		},
	},
});

export const { setQuestions, setQuestion, addQuestion, updateQuestion, deleteQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;