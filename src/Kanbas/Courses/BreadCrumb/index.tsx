import React from "react";
import { Navigate, useParams, useLocation, Link } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import ".//index.css";
import SmallBreadCrumb from "./SmallBreadCrumb";

// function BreadCrumbItem({ url, name, index, isLast }: { url: string, name: string, index: number, isLast: Boolean }) {
//     return (
//         <React.Fragment>
//             <li key={index} className="breadcrumb-item">
//                 <a href={url}>
//                     {name}
//                 </a>
//             </li>
//             {isLast ? "" : <span className="breadcrumb-item active"></span>}
//         </React.Fragment>
//     )
// }

function BreadCrumb() {
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
            // remove dashboard path and courses path
            isLast: segments.length - 1 === index
        })).splice(2, pathname.length - 2);

    let course = breadcrumbinfo[0].name;
    let page = breadcrumbinfo[breadcrumbinfo.length - 1].name;

    return (
        <div>
            {/* swap breadcrumb when navigation is hidden */}
            <div className="d-none d-md-block d-block">
                <div className="d-flex custom-breadcrumb">
                    <button type="button"><h4><HiMiniBars3 /></h4></button>
                    <nav>
                        <ol className="breadcrumb">
                            {breadcrumbinfo.map(info => (
                                <li className={info.isLast ? "breadcrumb-item active" : "breadcrumb-item"}>
                                    <Link className='text-link' to={`${info.url}`}>{info.name.replaceAll('%20', ' ')}</Link>
                                </li>
                            ))}
                        </ol>
                    </nav>
                </div>
            </div>
            <div className="d-block d-md-none">
                <SmallBreadCrumb />
            </div>
        </div >
    );
}
export default BreadCrumb;