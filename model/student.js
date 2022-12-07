import mongoose, { Schema } from "mongoose";

const StudentSchema = Schema({
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
export default StudentModel;
