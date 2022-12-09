import {
  deleteStudent,
  getAllStudents,
  getStudentById,
  saveStudent,
  updateStudent,
} from "../service/studentService.js";

export const findStudentById = async (req, res) => {
  const studentId = req.params.id;
  const response = await checkStudentById(studentId);
  return res.status(200).json(response);
};

export const findAllStudents = async (req, res) => {
  const response = await getAllStudents();
  return res.status(200).json(response);
};

export const addStudent = async (req, res) => {
  const body = req.body;
  const response = await saveStudent(body);
  return res.status(200).json(response);
};

export const editStudent = async (req, res) => {
  const studentId = req.params.id;
  if (await checkStudentById(studentId)) {
    const body = req.body;
    const payload = { name: body.name, email: body.email };
    const response = await updateStudent(studentId, payload);
    return res.status(200).json(response);
  } else {
    return res.status(400).json({ message: "Student not found" }); //Bad request
  }
};

export const removeStudent = async (req, res) => {
  const studentId = req.params.id;
  if (await checkStudentById(studentId)) {
    await deleteStudent(studentId);
    return res.status(200).send("Deleted successfully");
  } else {
    return res.status(400).json({ message: "Student not found" }); //Bad request
  }
};

const checkStudentById = async (studentId) => {
  return await getStudentById(studentId);
};
