import { useState } from "react";
import { useLocation } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import ".//index.css";

function SmallBreadCrumb() {
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
    const page = breadcrumbinfo[breadcrumbinfo.length - 1].name;

    const [expanded, setExpanded] = useState(false);

    const buttonHandler = () => {
        setExpanded(current => !current)
      }

    return (
        <div>
            <div className="d-flex small-breadcrumb">
                <button type="button"><h4><HiMiniBars3 /></h4></button>
                <nav className="content-nav-header">
                    <a role="button" onClick={(buttonHandler)}>
                        <div>{course}</div>
                        <div>{page}</div>
                    </a>
                </nav>
            </div>
            {
                expanded === true && (
                    <div>
                        <nav id="content-nav-container">
                            <span>PLACEHOLDER - NOT FINISHED</span>
                        </nav>
                    </div>
                )
            }
        </div >
    );
}
export default SmallBreadCrumb;