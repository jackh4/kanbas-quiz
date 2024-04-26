import { Link, useLocation } from "react-router-dom";
import "./index.css";

function CourseNavigation() {
    const links = ["Home", "Modules", "Piazza", "Grades", "Assignments", "Zoom Meetings", "Quizzes",
        "People", "Panopto Video", "Discussions", "Annoucements", "Pages", "Files", "Rubrics",
        "Outcomes", "Collaborations", "Syllabus", "Settings"];
    const { pathname } = useLocation();
    return (
        <div className="d-none d-sm-none d-block d-md-block">
            <ul className="wd-navigation">
                {links.map((link, index) => (
                    <li key={index} tabIndex={0} className={pathname.includes(link.replaceAll(' ', '%20')) ? "wd-active" : ""}>
                        <Link to={link}>{link}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default CourseNavigation;