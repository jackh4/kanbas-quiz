import * as client from "./client";
import { Module } from "./client";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaRegCheckCircle, FaPlus, FaTrash } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Modal, Dropdown, Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "./module.css";

function ModuleList() {
  const { courseId } = useParams();
  const [modules, setModules] = useState<Module[]>([]);
  const [module, setModule] = useState<Module>({
    _id: "123",
    name: "New Module",
    description: "",
    course: "123",
    lessons: [{
      _id: "123",
      name: "Module Lesson",
      description: "",
      module: "123",
    }],
  });

  const createModule = async () => {
    try {
      const newModule = await client.createModule(module);
      setModules([newModule, ...modules]);
    } catch (err) {
      console.log(err);
    }
  }
  const updateModule = async () => {
    try {
      const status = await client.updateModule(module);
      setModules(modules.map((m) => (m._id === module._id ? module : m)));
    } catch (err) {
      console.log(err);
    }
  }
  const deleteModule = async (module: Module) => {
    try {
      await client.deleteModule(module);
      setModules(modules.filter((m) => m._id !== module._id))
    } catch (err) {
      console.log(err);
    }
  }

  // const addModuleChild = async (moduleChild: any) => {
  //   try {
  //     const newModuleChild = await client.addModuleChild(moduleChild, module);
  //     setModules(modules.map((m) => (m._id === module._id ? module : m)));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // const updateModuleChild = async (moduleChild: any) => {
  //   try {
  //     const status = await client.updateModuleChild(moduleChild, module);
  //     setModules(modules.map((m) => (m._id === module._id ? module : m)));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // const deleteModuleChild = async (moduleChild: any, module: any) => {
  //   try {
  //     await client.deleteModuleChild(moduleChild, module);
  //     setModules(modules.map((m) => (m._id === module._id ? module : m)));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const fetchModules = async () => {
    const modules = await client.findAllModules();
    setModules(modules);
  };
  useEffect(() => { fetchModules(); }, []);

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
                      setModule({ ...module, name: e.target.value })
                    } />
                </Form.Group>
                <Form.Group className="mb-3" id="description_input">
                  <Form.Label>Module Description</Form.Label>
                  <Form.Control as="textarea" value={module.description}
                    onChange={(e) =>
                      setModule({ ...module, description: e.target.value })
                    } />
                </Form.Group>
                <Form.Group className="mb-3" id="description_input">
                  <Form.Label>Module Lessons</Form.Label>
                  <ul className="list-group">
                    {module.lessons?.map((lesson) => (
                      <li className="list-group-item">
                        {/* <Form.Group className="mb-3" id="name_input">
                          <Form.Label>Lesson Name</Form.Label>
                          <Form.Control type="text" value={lesson.name}
                            onChange={(e) =>
                              {const newLessons = module.lessons.map((newLesson) => 
                              newLesson._id === lesson._id ? { newLesson, name: e.target.value } : newLesson )
                              setModules({ ...module, lessons: (newLessons) })}
                            } />
                        </Form.Group> */}
                      </li>
                    ))}
                  </ul>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={(e) => { createModule(); handleClose(); }}> Add </Button>
              <Button onClick={(e) => { updateModule(); handleClose(); }}> Update </Button>
              <Button onClick={handleClose}>Cancel</Button>
            </Modal.Footer>
          </Modal>
          {modules
            .filter((module) => module.course === courseId)
            .map((module, index) => (
              <li key={index} className="list-group-item">
                <div className="align-icons-text">
                  <FaEllipsisV className="me-2" />
                  <span>{module.name}</span>
                  <span className="right-icons-align float-end">
                    <FaCheckCircle className="text-success" />
                    <FaPlusCircle className="ms-2" />

                    <Dropdown className="module-dropdown">
                      <Dropdown.Toggle role="toggle">
                        <Button ><FaEllipsisV /></Button>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <Button variant="btn-modules"
                            onClick={(event) => {
                              setModule(module);
                              handleShow();
                            }}>
                            Edit
                          </Button>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Button variant="btn-modules"
                            onClick={() => deleteModule(module)}>
                            Delete
                          </Button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                  </span>
                </div>
                <ul className="list-group">
                  {module.lessons?.map((lesson) => (
                    <li className="list-group-item">
                      <FaEllipsisV className="me-2" />
                      {lesson.name}
                      <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        {/* <Button
                          onClick={() => deleteModuleChild(lesson, module)}>
                          <FaTrash />
                        </Button> */}
                        <FaEllipsisV className="ms-2" />
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
export default ModuleList;