import "../../Styles/quiz.css"
import { Quiz, Question } from "../../client"
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  setQuestions, setQuestion, addQuestion, updateQuestion, deleteQuestion,
} from "../../QuizUtils/questionReducer";
import { KanbasState } from "../../../Kanbas/store";

export default function TrueFalse() {
  const dispatch = useDispatch(); 
  
  const question = useSelector((state: KanbasState) =>
    state.questionsReducer.question);
  const choices = ["True", "False"];

  useEffect(() => {
		dispatch(setQuestion({ ...question, choices: choices }));
	}, []);

  return (
    <div>
      <div className="">
        Set Answer:
        <div>
          <input name="truefalse" type="radio"
            onChange={(e) => dispatch(setQuestion({ ...question, correctAnswer: "True" }))}></input>
          <label htmlFor="truefalse">True</label>
          <input name="truefalse" type="radio"
            onChange={(e) => dispatch(setQuestion({ ...question, correctAnswer: "False" }))}></input>
          <label htmlFor="truefalse">False</label>
        </div>
      </div>
    </div >
  )
}