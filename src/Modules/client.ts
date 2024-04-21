import axios from "axios";

axios.defaults.withCredentials = true;
export const BASE_API = process.env.REACT_APP_API_BASE;
export const COURSES_API = `${BASE_API}/api/modules`;
export interface Module {
  _id: string,
  name: string,
  description: string,
  course: string,
  lessons: [{
    _id: string,
    name: string,
    description: string,
    module: string,
  }]
};
export const findAllModules = async () => {
  const response = await axios.get(`${COURSES_API}`);
  return response.data;
};
export const createModule = async (module: any) => {
  const response = await axios.post(`${COURSES_API}`, module);
  return response.data;
};
export const updateModule = async (module: any) => {
  const response = await axios.put(`${COURSES_API}/${module._id}`, module);
  return response.data;
};
export const deleteModule = async (module: any) => {
  const response = await axios.delete(`${COURSES_API}/${module._id}`);
  return response.data;
};
export const addModuleChild = async (moduleChild: any, module: any) => {
  const response = await axios.post(`${COURSES_API}/${module._id}`, moduleChild);
  return response.data;
};
export const updateModuleChild = async (moduleChild: any, module: any) => {
  const response = await axios.put(`${COURSES_API}/${module._id}/${moduleChild._id}`, moduleChild);
  return response.data;
};
export const deleteModuleChild = async (moduleChild: any, module: any) => {
  const response = await axios.delete(`${COURSES_API}/${module._id}`, moduleChild);
  return response.data;
};