import axios from "axios";

axios.defaults.withCredentials = true;
export const BASE_API = process.env.REACT_APP_API_BASE;
export const COURSES_API = `${BASE_API}/api/courses`;
export interface Course {
  _id: string,
  id: string,
  name: string,
  number: string,
  color: string,
  startDate: string,
  endDate: string,
  department: string,
  credits: number,
  description: string,
};
export const findAllCourses = async () => {
  const response = await axios.get(`${COURSES_API}`);
  return response.data;
};
export const createCourse = async (course: any) => {
  const response = await axios.post(`${COURSES_API}`, course);
  return response.data;
};
export const updateCourse = async (course: any) => {
  const response = await axios.put(`${COURSES_API}/${course._id}`, course);
  return response.data;
};
export const deleteCourse = async (course: any) => {
  const response = await axios.delete(`${COURSES_API}/${course._id}`);
  return response.data;
};



