import express, { json } from "express";
import mongoose, { Schema } from "mongoose";
import * as dotenv from "dotenv";
//import { StudentModel } from "./model/student";

dotenv.config();

const app = express();
app.use(json());

const PORT = process.env.PORT || 5500;
const DB_URL = process.env.DB_URL;

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const StudentModel = mongoose.model("student", StudentSchema);

const students = [
  { id: 1, name: "Habeeb", email: "habeeb@habeeb.com" },
  { id: 2, name: "Ganiyat", email: "ganiyat@habeeb.com" },
  { id: 3, name: "Raheemat", email: "ganiyat@habeeb.com" },
  { id: 4, name: "Rasheedat", email: "rasheedat@habeeb.com" },
];

/*app.get("/students", (req, res) => res.json(students));*/

app.get("/students", async (req, res) => {
  const allStudents = await StudentModel.find();
  res.json(allStudents);
});

/*app.get("/students/:id", (req, res) => {
  const studentId = req.params.id; //"3"
  const student = students.find((s) => s.id.toString() === studentId); //"3" === 3

  if (student) {
    return res.status(200).json(student); //OK
  } else {
    return res.status(404).json({ message: "Student not found" }); //Not found
  }
});*/
app.get("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  const foundStudent = await StudentModel.findById(studentId);
  return res.status(200).json(foundStudent);
});

/*app.post("/students", (req, res) => {
  const body = req.body;
  const newStudentList = [...students, body];
  return res.status(201).json(newStudentList); //Created
});*/

app.post("/students", async (req, res) => {
  const body = req.body;
  const savedStudent = await StudentModel.create(body);
  return res.status(201).json(savedStudent); //Created
});

app.put("/students/:id", (req, res) => {
  const studentId = req.params.id;
  const student = students.find((s) => s.id.toString() === studentId);
  if (student) {
    const body = req.body;
    const newArray = students.filter((s) => s.id.toString() !== studentId);
    return res.status(200).json([...newArray, body]);
  } else {
    return res.status(400).json({ message: "Student not found" }); //Bad request
  }
});

app.delete("/students/:id", (req, res) => {
  const studentId = req.params.id;
  const newArray = students.filter((s) => s.id.toString() !== studentId);
  return res.status(200).json(newArray);
});

/*mongoose.createConnection(DB_URL, (err) => {
  if (!err) {
    console.log("Connected to Mongodb");
  }
});*/

const connectDb = async () => await mongoose.connect(DB_URL);
connectDb();

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
