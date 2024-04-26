import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import "./index.css";
import { Modal, Dropdown, Button } from "react-bootstrap";

function Dashboard({ courses, course, show, setCourse, addNewCourse, deleteCourse, updateCourse, handleClose, handleShow }: {
    courses: any[]; course: any; show: boolean; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void; handleClose: () => void; handleShow: () => void;
}) {

    return (
        <div className="p-4">
            <h1>Dashboard</h1> <hr />
            <div className="dashboard-course-header">
                {/* Make the number of courses responsive */}
                <h2>Published Courses (3)</h2>
                <button className="course-button" onClick={handleShow}>Add/Edit Course</button>
            </div><hr />

            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Course Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Add functionality for image upload and color picker for background */}
                    <label>Course Name</label>
                    <input value={course.name} className="form-control"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                    <label>Course Number</label>
                    <input value={course.number} className="form-control"
                        onChange={(e) => setCourse({ ...course, number: e.target.value })} />
                    <label>Start Date</label>
                    <input value={course.startDate} className="form-control" type="date"
                        onChange={(e) => setCourse({ ...course, startDate: e.target.value })} />
                    <label>End Date</label>
                    <input value={course.endDate} className="form-control" type="date"
                        onChange={(e) => setCourse({ ...course, endDate: e.target.value })} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={(event) => { addNewCourse(); handleClose() }}>Add</Button>
                    <Button onClick={(event) => { updateCourse(); handleClose() }}>Update</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>

            <div className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses.map((course) => (
                        <div key={course._id} className="card-navigation col">
                            <div className="card">
                                {/* Course Information */}
                                {/* Images from public folder */}
                                <Link to={`/Kanbas/Courses/${course._id}/Home`}>
                                    <img src={`./images/${course.image}`} className="card-img-top"
                                        style={{ height: 150 }} alt="" /> </Link>
                                <div className="card-body">
                                    <Link className="card-title" to={`/Kanbas/Courses/${course._id}/Home`}
                                        style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                                        {course.name} </Link>
                                    <p className="card-text">{course.name}</p>
                                    <Link to={`/Kanbas/Courses/${course._id}/Home`} className="course-button">
                                        Go </Link>
                                </div>
                                {/* Edit and Delete Course (Move to separate file later on) */}
                                <Dropdown className="course-dropdown">
                                    <Dropdown.Toggle role="toggle">
                                        <FaEllipsisV className="fs-6" />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>
                                            <button className="course-button" onClick={(event) => {
                                                event.preventDefault();
                                                setCourse(course);
                                                handleShow();
                                            }}>
                                                Edit
                                            </button>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <button className="course-button" onClick={(event) => {
                                                event.preventDefault();
                                                deleteCourse(course._id);
                                            }}>
                                                Delete
                                            </button>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}
export default Dashboard;