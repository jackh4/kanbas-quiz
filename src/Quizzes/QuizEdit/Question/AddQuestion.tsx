import "../../Styles/quiz.css";
import "../../Styles/question.css";
import * as client from "../../client";
import { Quiz, Question } from "../../client";
import TrueFalse from "./TrueFalse";
import MultipleChoice from "./MultipleChoice";
import FillIn from "./FillIn";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
	setQuiz
} from "../../QuizUtils/quizReducer";
import {
	setQuestions, setQuestion, addQuestion, updateQuestion, deleteQuestion,
} from "../../QuizUtils/questionReducer";
import { KanbasState } from "../../../Kanbas/store";

export default function AddQuestion({ cancelQuestion }: { cancelQuestion: () => void }) {
	const dispatch = useDispatch();
	const [type, setType] = useState("MULTIPLE_CHOICE");
	const quiz = useSelector((state: KanbasState) =>
		state.quizzesReducer.quiz);
	const questions = useSelector((state: KanbasState) =>
		state.questionsReducer.questions);
	const question = useSelector((state: KanbasState) =>
		state.questionsReducer.question);

	useEffect(() => {
		dispatch(setQuestions(quiz.questions));
	}, []);

	const editQuestion = () => {

	}

	const addQuestionToQuiz = () => {
		const newQuestions = [...questions, question].map((question, index) => ({ ...question, id: index }));
		dispatch(setQuestions(newQuestions));
		dispatch(setQuiz({ ...quiz, questions: newQuestions }));
	}

	return (
		<div className="question-holder">
			<div className="question">
				<div className="edit-header">
					<div>
						<input value={question.title} type="text" placeholder="Question Title"
							onChange={(e) => dispatch(setQuestion({ ...question, title: e.target.value })
							)}></input>
					</div>
					<select
						onChange={(e) => {
							setType(e.target.value);
							dispatch(setQuestion({ ...question, type: e.target.value }))
						}}
						value={type || "MULTIPLE_CHOICE"}
						className=""
					>
						<option value="MULTIPLE_CHOICE">Multiple Choice</option>
						<option value="TRUE/FALSE">True/False</option>
						<option value="FILL_IN">Fill in the Blank</option>
					</select>
					<div className="edit-question-points-holder">
						Points
						<input type="number" value={question.points}
							onChange={(e) => {
								dispatch(setQuestion({ ...question, points: e.target.valueAsNumber }))
							}}></input>
					</div>
				</div>
				<div className="content">
					<div>
						Question: <br />
						<textarea className="" value={question.question}
							onChange={(e) => dispatch(setQuestion({ ...question, question: e.target.value }))}>
						</textarea>
					</div>
					<div>
						Answers
						{question.type === "MULTIPLE_CHOICE" && <MultipleChoice />}
						{question.type === "TRUE/FALSE" && <TrueFalse />}
						{question.type === "FILL_IN" && <FillIn />}
					</div>
				</div>
				<div>
					<button className="btn btn-quizzes"
						onClick={(e) => cancelQuestion()}
					>
						Cancel
					</button>
					<button className="btn btn-quizzes"
						onClick={(e) => addQuestionToQuiz()}
					>
						Save
					</button>
				</div>
			</div>
		</div >
	)
}