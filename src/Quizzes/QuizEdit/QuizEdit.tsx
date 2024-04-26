import "../Styles/quiz.css";
import * as client from "../client";
import { Tab, Tabs } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuizzes, setQuiz, addQuiz, updateQuiz, deleteQuiz,
} from "../QuizUtils/quizReducer";
import { setQuestions, setQuestion, } from "../QuizUtils/questionReducer";
import { KanbasState } from "../../Kanbas/store";
import { FaPlus, FaCircleCheck, FaRegTrashCan } from "react-icons/fa6";
import { SlPencil } from "react-icons/sl";
import { AiOutlineStop } from "react-icons/ai";
import AddQuestion from "./Question/AddQuestion";

export default function QuizEdit() {
  const { courseId, quizTitle } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quiz = useSelector((state: KanbasState) =>
    state.quizzesReducer.quiz);
  const quizzes = useSelector((state: KanbasState) =>
    state.quizzesReducer.quizzes);
  const questions = useSelector((state: KanbasState) =>
    state.questionsReducer.questions);
  // ONLY FOR CREATING NEW QUIZ
  const newQuiz = {
    title: "Quiz Title",
    description: "",
    quizType: "GRADED_QUIZ",
    points: 0,
    assignmentGroup: "QUIZZES",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    // show correct answers both boolean and date
    showCorrectAnswers: "",
    accessCode: "",
    oneQuestionPerTime: true,
    webcamRequired: false,
    lockQuestions: false,
    dueDate: Date(),
    availableDate: Date(),
    untilDate: Date(),
    questions: [],
    published: false,
    course: "RS101",
    previewAnswers: [],
  }

  const saveNewQuiz = async (publish: boolean) => {
    try {
      const newQuiz = await client.createQuiz(quiz);
    } catch (err) {
      console.log(err);
    }
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz.title}`)
  };
  const saveQuizUpdates = async (publish: boolean) => {
    try {
      const status = await client.updateQuiz(publish ? { ...quiz, published: true } : quiz);
    } catch (err) {
      console.log(err);
    }
    dispatch(updateQuiz(quiz));
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz.title}`)
  };
  const deleteStateQuestion = async (question: any) => {
    const newQuestions = questions.filter((q) => q.id !== question.id);
    dispatch(setQuestions(newQuestions))
    dispatch(setQuiz({ ...quiz, questions: newQuestions }));
  }
  useEffect(() => {
    if (quizTitle !== "idnewquiz") {
      client.findQuizByTitleCourse(courseId, quizTitle)
        .then((quiz) => dispatch(setQuiz(quiz)));
      dispatch(setQuestions(quiz.questions));
    } else {
      dispatch(setQuiz(newQuiz));
      dispatch(setQuiz({ ...newQuiz, course: courseId }));
      dispatch(setQuestions(newQuiz.questions));
    }
  }, []);
  let points = 0;
  useEffect(() => {
    let newPoints = 0;
    questions.map((question) => {
      newPoints += question.points;
    });
    points = newPoints;
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

  document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.getElementById('option') as HTMLInputElement;
    checkbox.checked = false;
  });

  const [show, setShow] = useState(false);
  const setShowFalse = () => setShow(false);

  return (
    <div>
      <div className="quiz-header">
        <div>
          Points {points}
        </div>
        <div>
          {quiz.published ? <div><FaCircleCheck /> Published</div> : <div><AiOutlineStop /> Not Published</div>}
        </div>
      </div>
      <hr />
      <Tabs>
        <Tab eventKey={"details"} title="Details">
          <div>
            <div>
              Quiz Title
              <input value={quiz.title} type="text"
                onChange={(e) => dispatch(setQuiz({ ...quiz, title: e.target.value }))} />
            </div>
            <div>
              Quiz Description
              <textarea
                onChange={(e) => dispatch(setQuiz({ ...quiz, description: e.target.value }))}>
                {quiz.description}
              </textarea>
            </div>
            <div>
              Quiz Type
              <select
                value={quiz.quizType}
                onChange={(e) => dispatch(setQuiz({ ...quiz, quizType: e.target.value }))}
              >
                <option value="GRADED_QUIZ">Graded Quiz</option>
                <option value="PRACTICE_QUIZ">Practice Quiz</option>
                <option value="GRADED_SURVEY">Graded Survey</option>
                <option value="UNGRADED_SURVEY">Ungraded Survey</option>
              </select>
            </div>
            <div>
              Assignment Group
              <select
                value={quiz.assignmentGroup}
                onChange={(e) => dispatch(setQuiz({ ...quiz, assignmentGroup: e.target.value }))}
              >
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="PROJECT">PROJECT</option>
              </select>
            </div>
            <div>
              Time Limit
              <input value={quiz.timeLimit} type="number" />
            </div>
            <div>
              Access Code
              <input value={quiz.accessCode} type="text"
                onChange={(e) => dispatch(setQuiz({ ...quiz, accessCode: e.target.value }))} />
            </div>
            <div className="quiz-edit-options">
              <div>
                Shuffle Answers
                <input type="checkbox" checked={quiz.shuffleAnswers}
                  onChange={(e) => dispatch(setQuiz({ ...quiz, shuffleAnswers: !quiz.shuffleAnswers }))} />
              </div>
              <div>
                Multiple Attempts
                <input type="checkbox" checked={quiz.multipleAttempts}
                  onChange={(e) => dispatch(setQuiz({ ...quiz, multipleAttempts: !quiz.multipleAttempts }))} />
              </div>
              <div>
                Show Correct Answers
                <input type="checkbox" checked={quiz.showCorrectAnswers}
                  onChange={(e) => dispatch(setQuiz({ ...quiz, showCorrectAnswers: !quiz.showCorrectAnswers }))} />
              </div>
              <div>
                One Question at a Time
                <input type="checkbox" checked={quiz.oneQuestionPerTime}
                  onChange={(e) => dispatch(setQuiz({ ...quiz, oneQuestionPerTime: !quiz.oneQuestionPerTime }))} />
              </div>
              <div>
                Webcam Required
                <input type="checkbox" checked={quiz.webcamRequired}
                  onChange={(e) => dispatch(setQuiz({ ...quiz, webcamRequired: !quiz.webcamRequired }))} />
              </div>
              <div>
                Lock Questions After Answering
                <input type="checkbox" checked={quiz.lockQuestions}
                  onChange={(e) => dispatch(setQuiz({ ...quiz, lockQuestions: !quiz.lockQuestions }))} />
              </div>
            </div>
            <div className="quiz-edit-times">
              <div>
                <input type="datetime-local"
                  onChange={(e) => dispatch(setQuiz({ ...quiz, dueDate: e.target.value.toString() }))} />
                Due Date: {formatDatetime(quiz.dueDate)}
              </div>
              <div>
                <input type="datetime-local"
                  onChange={(e) => dispatch(setQuiz({ ...quiz, availableDate: e.target.value.toString() }))} />
                Available Date: {formatDatetime(quiz.availableDate)}
              </div>
              <div>
                <input type="datetime-local"
                  onChange={(e) => dispatch(setQuiz({ ...quiz, untilDate: e.target.value.toString() }))} />
                Until Date: {formatDatetime(quiz.untilDate)}
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey={"questions"} title="Questions">
          <div>
            {questions.map((question) => (
              <div >
                {question.title}
                <button onClick={(e) => {
                  dispatch(setQuestion(question));
                  setShow(true);
                }}>
                  <SlPencil />
                </button>
                <button onClick={(e) => deleteStateQuestion(question)}>
                  <FaRegTrashCan />
                </button>
              </div>
            ))}

            {show && (
              <AddQuestion cancelQuestion={setShowFalse} />
            )}
            <div>
              <button
                className=""
                onClick={(e) => setShow(true)}>
                <FaPlus /> New Question
              </button>
            </div>
          </div>
        </Tab>
      </Tabs>
      <div>
        <button className="btn btn-quizzes"
          onClick={(e) => navigate(`/Kanbas/Courses/${courseId}/Quizzes`)}>
          Cancel
        </button>
        <button className="btn btn-quizzes"
          onClick={(e) => {
            dispatch(setQuiz({ ...quiz, published: true }));
            { quizTitle !== "idnewquiz" ? saveQuizUpdates(true) : saveNewQuiz(true) };
          }}>
          Save & Publish
        </button>
        <button className="btn btn-danger btn-quizzes"
          onClick={(e) => {
            { quizTitle !== "idnewquiz" ? saveQuizUpdates(false) : saveNewQuiz(false) };
          }}>
          Save
        </button>
      </div>
      {quiz.description}
    </div >
  )
}