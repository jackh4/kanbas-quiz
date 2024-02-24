import React, { useState } from "react";
import "./index.css";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaRegCheckCircle, FaPlus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useParams } from "react-router";

function ModuleList() {
    const { courseId } = useParams();
    const modulesList = modules.filter((module) => module.course === courseId);
    const [selectedModule, setSelectedModule] = useState(modulesList[0]);
    return (
        <div>
            <div className="content-buttons d-none d-sm-none d-block d-md-block">
                <a className="btn-modules" type="button">Collaspe All</a>
                <a className="btn-modules" type="button">View Progress</a>
                <a className="btn-modules" type="button"><i><FaRegCheckCircle color="green"/></i>Publish All</a>
                <a className="btn-modules red-background" type="button"><i><FaPlus /></i>Module</a>
                <a className="btn-modules" type="button"><BsThreeDotsVertical /></a>
            </div>

            <div>
                <ul className="list-group wd-modules">
                    {modulesList.map((module) => (
                        <li
                            className="list-group-item"
                            onClick={() => setSelectedModule(module)}>
                            <div>
                                <FaEllipsisV className="me-2" />
                                {module.name}
                                <span className="float-end">
                                    <FaCheckCircle className="text-success" />
                                    <FaPlusCircle className="ms-2" />
                                    <FaEllipsisV className="ms-2" />
                                </span>
                            </div>
                            {selectedModule._id === module._id && (
                                <ul className="list-group">
                                    {module.lessons?.map((lesson) => (
                                        <li className="list-group-item">
                                            <FaEllipsisV className="me-2" />
                                            {lesson.name}
                                            <span className="float-end">
                                                <FaCheckCircle className="text-success" />
                                                <FaEllipsisV className="ms-2" />
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default ModuleList;