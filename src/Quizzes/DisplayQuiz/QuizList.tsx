import * as client from "../client";
import "../Styles/quizlist.css"
import "../Styles/quiz.css"
import { FaPlus, FaEllipsisVertical, FaCircleCheck } from "react-icons/fa6";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { AiOutlineStop } from "react-icons/ai";
import { useState, useEffect, } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuizzes, setQuiz, addQuiz, updateQuiz, deleteQuiz,
} from "../QuizUtils/quizReducer";
import { KanbasState } from "../../Kanbas/store";

export default function QuizList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const quizzes = useSelector((state: KanbasState) =>
    state.quizzesReducer.quizzes);
  const quiz = useSelector((state: KanbasState) =>
    state.quizzesReducer.quiz);

  const createQuizL = async () => {
    client.createQuiz(quiz).then((quiz) => {
      dispatch(addQuiz(quiz));
    });
  };
  const updateQuizL = async (quiz: any) => {
    const status = await client.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };
  const deleteQuizL = async () => {
    client.deleteQuiz(quiz).then((status) => {
      dispatch(deleteQuiz(quiz));
    });
  };
  useEffect(() => {
    client.findAllCourseQuizzes(courseId).then((quizzes) => dispatch(setQuizzes(quizzes)));
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

  const compareDates = (availableDate: string, untilDate: string) => {
    const currentDate = new Date();
    const avaDate = new Date(availableDate);
    const untDate = new Date(untilDate);
    if (currentDate > avaDate || currentDate > untDate) {
      return <strong>Closed</strong>;
    } else if (currentDate > avaDate && currentDate < untDate) {
      return <strong>Available</strong>;
    } else {
      return <span><strong>Not available until </strong>{formatDatetime(availableDate)}</span>;
    }
  }

  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false)
  // const handleShow = () => setShow(true)

  //     const handleDeleteModule = (moduleId: string) => {
  //         client.deleteModule(moduleId).then((status) => {
  //             dispatch(deleteModule(moduleId));
  //         });
  //     };

  return (
    <div>
      <div className="quizzes-header">
        <button className="btn btn-danger quiz-buttons"
          onClick={(e) => navigate(`/Kanbas/Courses/${courseId}/Quizzes/idnewquiz/QuizEdit`)}>
          <FaPlus size={13} /> Quiz
        </button>
        {/* <button className="btn btn-quizzes"><FaEllipsisVertical /></button> */}
      </div>
      <hr />

      <div>

      </div>

      <div className="list-group li-quiz">
        {quizzes.filter((quiz) => quiz.course === courseId).map((quiz, index) => (
          <li key={index} className="list-group-item">
            <div>
              {/* GREEN BAR FOR PUBLISHED */}
              {/* {quiz.published ? <div className="green-bar"></div> : <div></div>} */}
              <div className="">
                <div className="ig-row">
                  <div className="ig-type-icon">
                    {quiz.published ? <i><HiOutlineRocketLaunch color="green" /></i> : <i><HiOutlineRocketLaunch /></i>}
                  </div>
                  <div className="ig-info">
                    <a href={`#/Kanbas/Courses/${quiz.course}/Quizzes/${quiz.title}`}>
                      <b>{quiz.title}</b>
                    </a>
                    <div className="ig-details">
                      <div className="ig-details-item">
                        {compareDates(quiz.availableDate, quiz.untilDate)}
                      </div>
                      <div className="ig-details-item">
                        {/* Due Date */}
                        <strong>Due</strong> {formatDatetime(quiz.dueDate)}
                      </div>
                      <div className="ig-details-item">
                        {/* Points */}
                        {quiz.points} pts
                      </div>
                      <div className="ig-details-item">
                        {/* Number of questions */}
                        {quiz.questions.length} Questions
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="right-icons-align float-end">
                      <div className="ig-type-icon">
                        {quiz.published ? <i><FaCircleCheck color="green" /></i> : <i><AiOutlineStop /></i>}
                      </div>
                      <Dropdown>
                        <Dropdown.Toggle role="toggle">
                          <div className="ig-type-icon">
                            <FaEllipsisVertical />
                          </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => navigate(`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz.title}/QuizEdit`)}>
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={(e) => { 
                              updateQuizL(quiz.published ?
                                { ...quiz, published: false } :
                                { ...quiz, published: true })
                            }}>
                            {quiz.published ? "Unpublish" : "Publish"}
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={(e) => { deleteQuizL() }}>
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </div>
    </div>
  )
}