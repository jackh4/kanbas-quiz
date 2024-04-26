import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import ".//index.css";

function SmallBreadCrumb() {
    const links = ["Home", "Modules", "Piazza", "Grades", "Assignments", "Zoom Meetings", "Quizzes",
        "People", "Panopto Video", "Discussions", "Annoucements", "Pages", "Files", "Rubrics",
        "Outcomes", "Collaborations", "Syllabus", "Settings"];
    const location = useLocation();
    const { pathname } = location;
    let url = '';
    // remove '/' path
    const segments = pathname.split('/').slice(1, pathname.length - 1),
        breadcrumbinfo = segments.map((segment, index) =>
        ({
            index: index,
            name: segment,
            url: url += `/${segment}`,
        })).splice(2, pathname.length - 2);

    const course = breadcrumbinfo[0].name;
    const page = breadcrumbinfo[breadcrumbinfo.length - 1].name.replaceAll('%20', ' ');

    const [expanded, setExpanded] = useState(false);

    const buttonHandler = () => {
        setExpanded(current => !current)
    }

    return (
        <div>
            <div className="d-flex small-breadcrumb">
                <button type="button">
                    <h4><HiMiniBars3 /></h4>
                </button>
                <nav className="content-nav-header">
                    <a role="button" onClick={(buttonHandler)}>
                        <div>{course}</div>
                        <div>{page}</div>
                    </a>
                </nav>
            </div>
            {
                expanded === true && (
                    <nav id="content-nav-container">
                        <span className="pop-down-grid">
                            {links.map((link, index) => (
                                <span key={index} tabIndex={0}
                                    className={pathname.includes(link.replaceAll(' ', '%20')) ? 
                                    "pop-down-row active-path" : "pop-down-row"}>
                                    <Link className="text-link" to={link}>{link}</Link>
                                </span>
                            ))}
                        </span>
                    </nav>
                )
            }
        </div >
    );
}
export default SmallBreadCrumb;