import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import QuizList from "../../Quizzes/DisplayQuiz/QuizList";
import QuizDetails from "../../Quizzes/DisplayQuiz/Quiz";
import QuizEdit from "../../Quizzes/QuizEdit/QuizEdit";
import PreviewQuiz from "../../Quizzes/DisplayQuiz/PreviewQuiz";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import BreadCrumb from "./BreadCrumb";
import SmallBreadCrumb from "./BreadCrumb/SmallBreadCrumb";

import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

function Courses() {
    // const { courseId } = useParams();
    // const COURSES_API = `${API_BASE}/api/courses`;

    // const [course, setCourse] = useState<any>({ _id: "" });
    // const findCourseById = async (courseId?: string) => {
    //     const response = await axios.get(
    //         `${COURSES_API}/${courseId}`
    //     );
    //     setCourse(response.data);
    // };
    // useEffect(() => {
    //     findCourseById(courseId);
    // }, [courseId]);

    // const course = courses.find((course) => course._id === courseId);
    return (
        <div>
            <BreadCrumb />
            <hr />
            <div className="d-flex content-cols-layout">
                <CourseNavigation />
                <div className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Piazza" element={<h1>Piazza</h1>} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:assignmentId" element={<AssignmentEditor />} />
                        <Route path="Grades" element={<h1>Grades</h1>} />
                        <Route path="Quizzes" element={<QuizList />} />
                        <Route path="Quizzes/:quizTitle" element={<QuizDetails />} />
                        <Route path="Quizzes/:quizTitle/QuizEdit" element={<QuizEdit />} />
                        <Route path="Quizzes/:quizTitle/PreviewQuiz" element={<PreviewQuiz />} />
                    </Routes>
                </div>

            </div>

        </div>
    );
}
export default Courses;