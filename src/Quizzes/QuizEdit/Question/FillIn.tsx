import "../../Styles/quiz.css"
import { Quiz, Question } from "../../client"
import { useEffect, useState } from "react";
import { FaPlus, FaEllipsisVertical, FaRegTrashCan } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuestions, setQuestion, addQuestion, updateQuestion, deleteQuestion,
} from "../../QuizUtils/questionReducer";
import { KanbasState } from "../../../Kanbas/store";

export default function FillIn() {
  const dispatch = useDispatch();
  const question = useSelector((state: KanbasState) =>
    state.questionsReducer.question);
  const [blanks, setBlanks] = useState<{ position: number, correctAnswer: string }[]>([]);

  const addBlank = () => {
    setBlanks([...blanks, { position: blanks.length, correctAnswer: "" }])
    dispatch(setQuestion({ ...question, blanks: blanks }));
  }
  const editBlank = (index: number, answer: string) => {
    const newBlanks = [...blanks];
    newBlanks[index] = { position: index, correctAnswer: answer };
    setBlanks(newBlanks);
    dispatch(setQuestion({ ...question, blanks: newBlanks }));
  }
  const deleteBlank = (delIndex: number) => {
    const newBlanks = blanks.filter((blank, index) => index !== delIndex)
      .map((blank, index) => ({ ...blank, position: index }))
    setBlanks(newBlanks);
    dispatch(setQuestion({ ...question, blanks: newBlanks }));
  }

  return (
    <div>
      <div className="">
        {blanks.map((blank: any, index: number) =>
          <div>
            <input type="text" value={blank.correctAnswer}
              onChange={(e) => editBlank(index, e.target.value)} />
            <button onClick={(e) => deleteBlank(index)}>
              <FaRegTrashCan />
            </button>
          </div>
        )}
        <div className="">
          <button onClick={addBlank}><FaPlus />Add Another Blank</button>
        </div>
      </div>
    </div >
  )
}