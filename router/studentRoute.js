import express from "express";
import {
  addStudent,
  editStudent,
  findAllStudents,
  findStudentById,
  removeStudent,
} from "../controller/studentController.js";

const studentRoute = express.Router();

//CRUD operations
studentRoute.route("/").get(findAllStudents).post(addStudent);
studentRoute
  .route("/:id")
  .get(findStudentById)
  .put(editStudent)
  .delete(removeStudent);

export default studentRoute;
