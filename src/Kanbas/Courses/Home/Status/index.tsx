import { Link, useParams } from "react-router-dom";
import { assignments } from "../../../Database";
import "./index.css";
import { FaFileImport, FaChartBar, FaBell, FaRegCalendarAlt } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { ImTarget } from "react-icons/im";
import { RiMegaphoneLine } from "react-icons/ri";

function Status() {
    const buttons = [
        { label: "Import Existing Content", icon: <FaFileImport className="fs-5" /> },
        { label: "Import from Commons", icon: <FaArrowRightFromBracket className="fs-5" /> },
        { label: "Choose Home Page", icon: <ImTarget className="fs-5" /> },
        { label: "View Course Stream", icon: <FaChartBar className="fs-5" /> },
        { label: "New Annoucement", icon: <RiMegaphoneLine className="fs-5" /> },
        { label: "New Analytics", icon: <FaChartBar className="fs-5" /> },
        { label: "View Course Notifications", icon: <FaBell className="fs-5" /> }
    ];
    const { courseId } = useParams();
    const assignmentList = assignments.filter(
        (assignment) => assignment.course === courseId);
    return (
        <div className="secondary-status">
            <div className="course-status">
                {buttons.map((link, index) => (
                    <a className="btn button-sidebar-wide">
                        <i>{link.icon}</i> {link.label}
                    </a>
                ))}
            </div>
            <div className="course-to-do-status">
                <span>To Do</span>
                <hr />
                <ul className="course-to-do-status-links">
                    {assignmentList.map((assignment) => (
                        <li className="list-group-item">
                            <FaRegCalendarAlt/>
                            <Link to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}>{assignment.title}</Link>
                        </li>))}
                </ul>
            </div>
        </div>
    )
}
export default Status;