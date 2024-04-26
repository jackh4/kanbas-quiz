import "../Styles/quiz.css"
import "../Styles/quizlist.css"
import * as client from "../client";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { FaCircleCheck } from "react-icons/fa6";
import { SlPencil } from "react-icons/sl";
import { AiOutlineStop } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuizzes, setQuiz, addQuiz, updateQuiz, deleteQuiz,
} from "../QuizUtils/quizReducer";
import { KanbasState } from "../../Kanbas/store";

export default function QuizDetails() {
  const { courseId, quizTitle } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quiz = useSelector((state: KanbasState) =>
    state.quizzesReducer.quiz);

  const publishQuiz = async (publish: boolean) => {
    try {
      const status = await client.updateQuiz(publish ? { ...quiz, published: true } : quiz);
    } catch (err) {
      console.log(err);
    }
    dispatch(updateQuiz(quiz));
  }
  // const saveQuizUpdates = async (publish: boolean) => {
  //   setQuiz({ ...quiz, published: publish })
  //   try {
  //     const status = await client.updateQuiz(quiz);
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   dispatch(updateQuiz(quiz));
  //   navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz.title}`)
  // };
  useEffect(() => {
    client.findQuizByTitleCourse(courseId, quizTitle)
      .then((quiz) => dispatch(setQuiz(quiz))
      );
  }, []);

  const formatDatetime = (datetime: string) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "June",
      "July", "Aug", "Sep", "Oct", "Nov", "De"
    ];
    const date = new Date(datetime);
    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    const hour = date.getUTCHours();
    const mins = date.getUTCMinutes();

    const period = hour >= 12 ? 'pm' : 'am';
    const padMins = mins < 10 ? '0' + mins : mins;
    const stanHour = (period === 'pm') ? hour - 12 : hour;
    return `${month} ${day} at ${stanHour}:${padMins}${period}`;
  };

  return (
    <div>
      <div className="quiz-header">
        <div className="">
          {quiz.published ?
            <button className="btn btn-success quiz-buttons"
              onClick={(e) => publishQuiz(false)}>
              <FaCircleCheck /> Published
            </button> :
            <button className="btn btn-danger quiz-buttons"
              onClick={(e) => publishQuiz(true)}>
              <AiOutlineStop /> Not Published
            </button>}
        </div>
        <button className="btn quiz-buttons btn-quizzes"
          onClick={() => {
            quiz.published &&
              navigate(`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz.title}/PreviewQuiz`)
          }}>
          Preview
        </button>
        <button className="btn quiz-buttons btn-quizzes"
          onClick={() => navigate(`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz.title}/QuizEdit`)}>
          <SlPencil rotate={180} />Edit
        </button>
      </div>
      <hr />
      <div>
        <h2>{quiz.title}</h2>
      </div>
      <div>
        <div className="quiz-detail">
          <b>Quiz Type</b> <span>{quiz.quizType}</span>
        </div>
        <div className="quiz-detail">
          <b>Points</b> <span>{quiz.points}</span>
        </div>
        <div className="quiz-detail">
          <b>Assignment Group</b> {quiz.assignmentGroup}
        </div>
        <div className="quiz-detail">
          <b>Shuffle Answers</b> {quiz.shuffleAnswers ? "Yes" : "No"}
        </div>
        <div className="quiz-detail">
          <b>Time Limit</b> {quiz.timeLimit}
        </div>
        <div className="quiz-detail">
          <b>Multiple Attempts</b> {quiz.multipleAttempts ? "Yes" : "No"}
        </div>
        <div className="quiz-detail">
          <b>Show Correct Answers</b> {quiz.showCorrectAnswers ? "Yes" : "No"}
        </div>
        <div className="quiz-detail">
          <b>Access Code</b> {quiz.accessCode}
        </div>
        <div className="quiz-detail">
          <b>One Question at a Time</b> {quiz.oneQuestionPerTime ? "Yes" : "No"}
        </div>
        <div className="quiz-detail">
          <b>Webcam Required</b> {quiz.webcamRequired ? "Yes" : "No"}
        </div>
        <div className="quiz-detail">
          <b>Lock Questions After Answering</b> {quiz.lockQuestions ? "Yes" : "No"}
        </div>
        <div>
          <table className="quiz-times-table">
            <thead>
              <tr>
                <th>Due</th>
                <th>Available from </th>
                <th>Until </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{formatDatetime(quiz.dueDate)}</td>
                <td>{formatDatetime(quiz.availableDate)}</td>
                <td>{formatDatetime(quiz.untilDate)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div >
  )
}