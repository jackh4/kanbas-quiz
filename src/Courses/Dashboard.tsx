import * as client from "./client";
import "./course.css";
import { useState, useEffect, } from "react";
import { Link } from "react-router-dom";
import { Course } from "./client";
import { Modal, Button } from "react-bootstrap";
import CourseDropdown from "./Dropdown";

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState<Course>({
    _id: "1234",
    id: "1234",
    name: "New Course",
    number: "New Number",
    color: "gray",
    startDate: Date().toString(),
    endDate: Date().toString(),
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
  const deleteCourse = async () => {
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
          <label>Course Name</label>
          <input value={course.name} className="form-control"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <label>Course Number</label>
          <input value={course.number} className="form-control"
            onChange={(e) => setCourse({ ...course, number: e.target.value })} />
          <label>Description</label>
          <input value={course.description} className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          <label>Department</label>
          <input value={course.department} className="form-control"
            onChange={(e) => setCourse({ ...course, department: e.target.value })} />
          <label>Start Date</label>
          <input value={course.startDate.slice(0, 10)} className="form-control" type="date"
            onChange={(e) => setCourse({ ...course, startDate: e.target.value })} />
          <label>End Date ({course.endDate})</label>
          <input value={course.endDate.slice(0, 10)} className="form-control" type="date"
            onChange={(e) => setCourse({ ...course, endDate: e.target.value })} />
          <label>Credits</label>
          <input value={course.credits} className="form-control" type="number"
            onChange={(e) => setCourse({ ...course, credits: e.target.valueAsNumber })} />
          <label>Background Color (Color Name or Color Code)</label>
          <input value={course.color} className="form-control"
            onChange={(e) => setCourse({ ...course, color: e.target.value })} />
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
              <Link to={`/Kanbas/Courses/${course.id}/Home`}>
                <div className="card-header-image" style={{ backgroundColor: course.color }}></div>
              </Link>
              <div className="card-body">
                <Link className="card-title" to={`/Kanbas/Courses/${course.id}/Home`}>
                  {course.name} </Link>
                <p className="card-text">{course.name}</p>
                <Link to={`/Kanbas/Courses/${course.id}/Home`} className="course-button">
                  Go </Link>
              </div>

              <CourseDropdown
                course={course}
                setCourse={setCourse}
                deleteCourse={deleteCourse}
                handleShow={handleShow}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}