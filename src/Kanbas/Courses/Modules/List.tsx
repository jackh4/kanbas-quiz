import React, { useEffect, useState } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaRegCheckCircle, FaPlus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useParams } from "react-router";
import { Modal, Dropdown, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
    setModules,
} from "./reducer";
import * as client from "./client";
import { KanbasState } from "../../store";

function ModuleList() {
    const { courseId } = useParams();
    useEffect(() => {
        client.findModulesForCourse(courseId)
            .then((modules) =>
                dispatch(setModules(modules))
            );
    }, [courseId]);

    const handleAddModule = () => {
        client.createModule(courseId, module).then((module) => {
            dispatch(addModule(module));
        });
    };
    const handleDeleteModule = (moduleId: string) => {
        client.deleteModule(moduleId).then((status) => {
            dispatch(deleteModule(moduleId));
        });
    };
    const handleUpdateModule = async () => {
        const status = await client.updateModule(module);
        dispatch(updateModule(module));
    };

    const moduleList = useSelector((state: KanbasState) =>
        state.modulesReducer.modules);
    const module = useSelector((state: KanbasState) =>
        state.modulesReducer.module);
    const dispatch = useDispatch();

    // const modulesList = modules.filter((module) => module.course === courseId);
    // const [selectedModule, setSelectedModule] = useState(moduleList[0]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <div>
            <div className="content-buttons d-none d-sm-none d-block d-md-block">
                <a className="btn-modules" type="button">Collaspe All</a>
                <a className="btn-modules" type="button">View Progress</a>
                <a className="btn-modules" type="button">
                    <div className="align-icon-text">
                        <FaRegCheckCircle color="green" />
                        <span>Publish All</span>
                    </div>
                </a>
                <a className="btn-modules red-button" type="button" onClick={handleShow}>
                    <div className="align-icon-text">
                        <FaPlus size={13} />
                        <span>Module</span>
                    </div>
                </a>
                <a className="btn-modules" type="button"><BsThreeDotsVertical /></a>
            </div>

            <div>
                <ul className="list-group wd-modules">
                    <Modal centered show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Module Information</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" id="name_input">
                                    <Form.Label>Module Name</Form.Label>
                                    <Form.Control type="text" value={module.name}
                                        onChange={(e) =>
                                            dispatch(setModule({ ...module, name: e.target.value }))
                                        } />
                                </Form.Group>
                                <Form.Group className="mb-3" id="description_input">
                                    <Form.Label>Module Description</Form.Label>
                                    <Form.Control as="textarea" value={module.description}
                                        onChange={(e) =>
                                            dispatch(setModule({ ...module, description: e.target.value }))
                                        } />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                onClick={(event) => {
                                    handleAddModule();
                                    handleClose();
                                }}>
                                Add
                            </button>
                            <button
                                onClick={(event) => {
                                    handleUpdateModule();
                                    handleClose();
                                }}>
                                Update
                            </button>
                            <button onClick={handleClose}>Cancel</button>
                        </Modal.Footer>
                    </Modal>
                    {moduleList
                        .filter((module) => module.course === courseId)
                        .map((module, index) => (
                            <li key={index} className="list-group-item">
                                {/* onClick={() => setSelectedModule(module)} */}
                                <div className="align-icons-text">
                                    <FaEllipsisV className="me-2" />
                                    <span>{module.name}</span>
                                    <span className="right-icons-align float-end">
                                        <FaCheckCircle className="text-success" />
                                        <FaPlusCircle className="ms-2" />
                                        <Dropdown className="module-dropdown">
                                            <Dropdown.Toggle role="toggle">
                                                <button ><FaEllipsisV /></button>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item>
                                                    <button className="btn-modules"
                                                        onClick={(event) => {
                                                            dispatch(setModule(module));
                                                            handleShow();
                                                        }}>
                                                        Edit
                                                    </button>
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                    <button className="btn-modules"
                                                        onClick={() => handleDeleteModule(module._id)}>
                                                        Delete
                                                    </button>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </span>
                                </div>
                                {/* Lesssons database for assignment 5 */}
                                {/* {selectedModule._id === module._id && (
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
                                )} */}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}
export default ModuleList;