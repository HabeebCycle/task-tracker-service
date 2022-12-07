import express, { json } from "express";
import mongoose, { Schema } from "mongoose";
import * as dotenv from "dotenv";
import StudentModel from "./model/student.js";

dotenv.config();

const app = express();
app.use(json());

const PORT = process.env.PORT || 5500;
const DB_URL = process.env.DB_URL;

app.get("/students", async (req, res) => {
  const allStudents = await StudentModel.find();
  res.json(allStudents);
});

app.get("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  const foundStudent = await StudentModel.findById(studentId);
  return res.status(200).json(foundStudent);
});

app.post("/students", async (req, res) => {
  const body = req.body;
  const savedStudent = await StudentModel.create(body);
  return res.status(201).json(savedStudent); //Created
});

app.put("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  const foundStudent = await StudentModel.findById(studentId);
  if (foundStudent) {
    const body = req.body;
    const payload = { name: body.name, email: body.email };
    const updatedStudent = await StudentModel.findByIdAndUpdate(
      studentId,
      payload,
      { returnDocument: "after" }
    );
    return res.status(200).json(updatedStudent);
  } else {
    return res.status(400).json({ message: "Student not found" }); //Bad request
  }
});

app.delete("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  const result = await StudentModel.findByIdAndDelete(studentId);
  return res.status(200).send("Deleted successfully");
});

//const connectDb = async () => await mongoose.connect(DB_URL);
//connectDb();

mongoose
  .connect(DB_URL)
  .then((con) =>
    console.log(`Connected to MongoDb cluster via ${con.connection.host}`)
  )
  .catch((err) =>
    console.error(`Unable to connect to MongoDb cluster ${err.message}`)
  );

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
