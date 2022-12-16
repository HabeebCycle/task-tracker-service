import asyncHandler from "express-async-handler";
import {
  deleteStudent,
  getAllStudents,
  getStudentById,
  saveStudent,
  updateStudent,
} from "../service/studentService.js";

export const findStudentById = asyncHandler(async (req, res, next) => {
  const studentId = req.params.id;
  //const queryParams = req.query;
  const headers = req.headers.myname;
  console.log(headers);
  const response = await checkStudentById(studentId);
  if (response) {
    res.header({ key: "findStudentById", value: "response" });
    return res.status(200).json(response);
  } else {
    res.status(404);
    throw new Error(`Student not found of id: ${studentId}`);
  }
});

export const findAllStudents = asyncHandler(async (req, res) => {
  const response = await getAllStudents();
  return res.status(200).json(response);
});

export const addStudent = asyncHandler(async (req, res) => {
  const body = req.body;
  const response = await saveStudent(body);
  return res.status(200).json(response);
});

export const editStudent = asyncHandler(async (req, res) => {
  const studentId = req.params.id;
  if (await checkStudentById(studentId)) {
    const body = req.body;
    const payload = { name: body.name, email: body.email };
    const response = await updateStudent(studentId, payload);
    return res.status(200).json(response);
  } else {
    return res.status(400).json({ message: "Student not found" }); //Bad request
  }
});

export const removeStudent = asyncHandler(async (req, res) => {
  const studentId = req.params.id;
  if (await checkStudentById(studentId)) {
    await deleteStudent(studentId);
    return res.status(200).send("Deleted successfully");
  } else {
    return res.status(400).json({ message: "Student not found" }); //Bad request
  }
});

const checkStudentById = async (studentId) => {
  return await getStudentById(studentId);
};
