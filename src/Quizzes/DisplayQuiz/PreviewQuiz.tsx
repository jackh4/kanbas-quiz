import "../Styles/quiz.css";
import "../Styles/question.css";
import * as client from "../client";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuizzes, setQuiz, addQuiz, updateQuiz, deleteQuiz,
} from "../QuizUtils/quizReducer";
import { KanbasState } from "../../Kanbas/store";
import { BsExclamationCircle } from "react-icons/bs";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa6";

export default function PreviewQuiz() {
  const { courseId, quizTitle } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currQuestion, setCurrQuestion] = useState(0);
  const [preAnswers, setPreAnswers] = useState<string[]>([]);
  const quiz = useSelector((state: KanbasState) =>
    state.quizzesReducer.quiz);

  const savePreviewQuizAnswers = async (answers: string[]) => {
    try {
      await client.updateQuiz(quiz).then(() =>
        dispatch(setQuiz({ ...quiz, previewAnswers: answers })));
    } catch (err) {
      console.log(err);
    }
  };
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
      <div>
        {quiz.title}
      </div>
      <div>
        <BsExclamationCircle /> This is a preview of the published version of the quiz
      </div>
      <div>
        Started: {formatDatetime(new Date().toString())}
      </div>
      <div className="">
        Quiz Instructions
      </div>
      <div>
        QUESTION LINKS
      </div>
      <hr />
      <div>
        <div>
          {quiz.oneQuestionPerTime ? quiz.questions.map((question: any, index: number) => (
            <div key={index} style={{ display: index === currQuestion ? "block" : "none" }}>
              <div className="question-holder">
                <div className="question">
                  <div className="header">
                    {question.title}
                    {question.points} pts
                  </div>
                  <div className="content">
                    {question.question}
                  </div>
                  <div className="answers">
                    {(question.type === "MULTIPLE_CHOICE" || question.type === "TRUE/FALSE") &&
                      question.choices.map((choice: string, index: number) => (
                        <div>
                          <hr />
                          <div className="">
                            <input type="radio" name="radios" />
                            <label>
                              {choice}
                            </label>
                          </div>
                        </div>
                      ))}
                    {question.type === "FILL_IN" &&
                      question.blanks.map((blank: any, index: number) => (
                        <div>
                          <hr />
                          <div>
                            {blank.position + 1}.
                            <input type="text" />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div>
                <div>
                  {0 !== index &&
                    <button className="btn"
                      onClick={() => setCurrQuestion(currQuestion - 1)}>
                      <FaCaretLeft /> Prev
                    </button>}
                </div>
                <div>
                  {quiz.questions.length !== (index + 1) &&
                    <button className="btn"
                      onClick={() => setCurrQuestion(currQuestion + 1)}>
                      Next <FaCaretRight />
                    </button>}
                </div>
              </div>
            </div>
          )) : quiz.questions.map((question: any, index: number) => (
            <div>
              <div className="question-holder">
                <div className="question">
                  <div className="header">
                    {question.title}
                    {question.points} pts
                  </div>
                  <div className="content">
                    {question.question}
                  </div>
                  <div className="answers">
                    {(question.type === "MULTIPLE_CHOICE" || question.type === "TRUE/FALSE") &&
                      question.choices.map((choice: string, index: number) => (
                        <div>
                          <hr />
                          <div className="">
                            <input type="radio" name="radios" />
                            <label>
                              {choice}
                            </label>
                          </div>
                        </div>
                      ))}
                    {question.type === "FILL_IN" &&
                      question.blanks.map((blank: any, index: number) => (
                        <div>
                          <hr />
                          <div>
                            {blank.position + 1}.
                            <input type="text" />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          {quiz.questions.map((question: any, index: number) => (
            <div>
              <button onClick={(e) => setCurrQuestion(index)}>
                Question {index + 1}
              </button>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className="quiz-preview-footer">
        <button className="btn"
          onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizTitle}`)}>
          Exit
        </button>
      </div>
      <div className="quiz-preview-footer">
        <button className="btn"
          onClick={() => {
            savePreviewQuizAnswers(preAnswers);
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizTitle}`);
          }}>
          Submit Quiz
        </button>
      </div>
      <hr />
    </div>
  )
}