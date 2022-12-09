import StudentModel from "../model/student.js";

export const getStudentById = async (studentId) => {
  const foundStudent = await StudentModel.findById(studentId);
  return foundStudent;
};

export const getAllStudents = async () => {
  const foundStudents = await StudentModel.find();
  return foundStudents;
};

export const saveStudent = async (student) => {
  const savedStudent = await StudentModel.create(student);
  return savedStudent;
};

export const updateStudent = async (studentId, student) => {
  const updatedStudent = await StudentModel.findByIdAndUpdate(
    studentId,
    student,
    { returnDocument: "after" }
  );

  return updatedStudent;
};

export const deleteStudent = async (studentId) => {
  await StudentModel.findByIdAndDelete(studentId);
};
