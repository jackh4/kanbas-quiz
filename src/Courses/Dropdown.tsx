import "./course.css";
import { Dropdown, Button } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";

export default function CourseDropdown({ course, setCourse, deleteCourse, handleShow }: {
  course: any; setCourse: (course: any) => void;
  deleteCourse: (course: any) => void; handleShow: () => void;
}) {
  return (
    <div>
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
  )
}