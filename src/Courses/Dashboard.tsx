import * as client from "./client";
import { useState, useEffect, } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Course } from "./client";
import "./course.css";

import { Modal, Dropdown, Button } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState<Course>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    color: "gray",
    startDate: Date(),
    endDate: Date(),
    department: "",
    credits: 0,
    description: "",
  });

  const createCourse = async () => {
    try {
      const newCourse = await client.createCourse(course);
      setCourses([newCourse, ...courses]);
    } catch (err) {
      console.log(err);
    }
  }
  const updateCourse = async () => {
    try {
      const status = await client.updateCourse(course);
      setCourses(courses.map((c) => (c._id === course._id ? course : c)));
    } catch (err) {
      console.log(err);
    }
  }
  const deleteCourse = async (course: Course) => {
    try {
      await client.deleteCourse(course);
      setCourses(courses.filter((c) => c._id !== course._id))
    } catch (err) {
      console.log(err);
    }
  }

  const fetchCourses = async () => {
    const courses = await client.findAllCourses();
    setCourses(courses);
  };
  useEffect(() => { fetchCourses(); }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div className="row">

      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <hr />
        <div className="dashboard-course-header">
          <h2>Published Courses ({courses.length})</h2>
          <button className="course-button" onClick={handleShow}>Add/Edit Course</button>
        </div>
        <hr />
      </div>

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
          <Button onClick={(e) => { createCourse(); handleClose() }}>Add</Button>
          <Button onClick={(e) => { updateCourse(); handleClose() }}>Update</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>

      <div className="row row-cols-1 row-cols-md-5 g-4">
        {courses.map((course) => (
          <div className="card-navigation col">
            <div className="card">
              <Link to={`/Kanbas/Courses/${course._id}/Home`}>
                <div className="card-header-image" style={{ backgroundColor: course.color }}></div>
              </Link>
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
                    <Button variant="course-button" onClick={(event) => {
                      event.preventDefault();
                      setCourse(course);
                      handleShow();
                    }}>
                      Edit
                    </Button>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Button variant="course-button" onClick={(event) => {
                      event.preventDefault();
                      deleteCourse(course);
                    }}>
                      Delete
                    </Button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}