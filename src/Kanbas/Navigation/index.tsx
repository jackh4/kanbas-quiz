import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { FaTachometerAlt, FaRegUserCircle, FaBook, FaRegCalendarAlt, FaRegClock, FaRegQuestionCircle } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { CgScreen } from "react-icons/cg";
import { TiPrinter } from "react-icons/ti";

function KanbasNavigation() {
    const links = [
        { label: "Account", icon: <FaRegUserCircle className="fs-3" /> },
        { label: "Dashboard", icon: <FaTachometerAlt className="fs-3" /> },
        { label: "Courses", icon: <FaBook className="fs-3" /> },
        { label: "Calendar", icon: <FaRegCalendarAlt className="fs-3" /> },
        { label: "Inbox", icon: <TiPrinter className="fs-2" /> },
        { label: "History", icon: <FaRegClock className="fs-3" /> },
        { label: "Studio", icon: <CgScreen className="fs-3" /> },
        { label: "Commons", icon: <FaArrowRightFromBracket className="fs-3" /> },
        { label: "Help", icon: <FaRegQuestionCircle className="fs-3" /> },
    ];
    const { pathname } = useLocation();
    return (
        <div className="kanbas-navigation d-none d-sm-none d-block d-md-block">
            <ul className="wd-kanbas-navigation">
                <li>
                    <Link to={`/Kanbas/`}> <img src={`/images/northeastern_logo.png`} width="100%" height="100%" alt="" /> </Link>
                </li>
                {links.map((link, index) => (
                    <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
                        <Link to={`/Kanbas/${link.label}`}> <i>{link.icon}</i> <br /> {link.label} </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default KanbasNavigation;