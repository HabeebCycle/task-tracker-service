import express, { json } from "express";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(json());

const PORT = process.env.PORT || 5500;

const students = [
  { id: 1, name: "Habeeb", email: "habeeb@habeeb.com" },
  { id: 2, name: "Ganiyat", email: "ganiyat@habeeb.com" },
  { id: 3, name: "Raheemat", email: "ganiyat@habeeb.com" },
  { id: 4, name: "Rasheedat", email: "rasheedat@habeeb.com" },
];

app.get("/students", (req, res) => res.json(students));
app.get("/students/:id", (req, res) => {
  const studentId = req.params.id; //"3"
  const student = students.find((s) => s.id.toString() === studentId); //"3" === 3

  if (student) {
    return res.status(200).json(student);
  } else {
    return res.status(404).json({ message: "Student not found" });
  }
});

app.post("/students", (req, res) => {
  const body = req.body;
  const newStudentList = [...students, body];
  return res.status(201).json(newStudentList);
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
