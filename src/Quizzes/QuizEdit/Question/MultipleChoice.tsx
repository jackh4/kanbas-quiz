import "../../Styles/quiz.css"
import { Quiz, Question } from "../../client"
import { useEffect, useState } from "react";
import { FaPlus, FaEllipsisVertical, FaRegTrashCan } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuestions, setQuestion, addQuestion, updateQuestion, deleteQuestion,
} from "../../QuizUtils/questionReducer";
import { KanbasState } from "../../../Kanbas/store";

export default function MultipleChoice() {
  const dispatch = useDispatch();
  const question = useSelector((state: KanbasState) =>
    state.questionsReducer.question);
  const [choices, setChoices] = useState<string[]>([]);

  const addChoice = () => {
    setChoices([...choices, ""]);
    dispatch(setQuestion({ ...question, choices: choices }));
  };
  const editChoice = (index: number, value: string) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
    dispatch(setQuestion({ ...question, choices: newChoices }));
  };
  const deleteChoice = (delIndex: number) => {
    const newChoices = choices.filter((choice, index) => index !== delIndex)
    setChoices(newChoices);
    dispatch(setQuestion({ ...question, choices: newChoices }));
  }
  const setAnswer = (answer: string) => {
    dispatch(setQuestion({ ...question, correctAnswer: answer }));
  }
  useEffect(() => {
		setChoices(question.choices)
	}, []); 

  return (
    <div>
      <div className="">
        {choices.map((choice: string, index: number) =>
          <div>
            <input type="radio" name="multiple"
              onChange={(e) => setAnswer(choices[index])} />
            <input type="text" value={choice}
              onChange={(e) => editChoice(index, e.target.value)} />
            <button onClick={(e) => deleteChoice(index)}>
              <FaRegTrashCan />
            </button>
          </div>
        )}
        <div className="">
          <button onClick={addChoice}><FaPlus />Add Another Choice</button>
        </div>
      </div>
    </div >
  )
}