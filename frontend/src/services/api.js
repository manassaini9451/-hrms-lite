import axios from "axios";

const API = axios.create({

baseURL: "https://hrms-backend-7yeh.onrender.com/api"
});

export const getEmployees = () => API.get("/employees");

export const addEmployee = (data) => API.post("/employees", data);

export const deleteEmployee = (id) => API.delete(`/employees/${id}`);

export const markAttendance = (data) => API.post("/attendance", data);

export const getAttendance = (employeeId) =>
  API.get(`/attendance/${employeeId}`);