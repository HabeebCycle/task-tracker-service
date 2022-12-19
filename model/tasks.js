import mongoose, { Schema } from "mongoose";

const TaskSchema = Schema({
  owner: mongoose.Types.ObjectId,
  text: {
    type: String,
    required: [true, "Please enter the task text"],
  },
  day: {
    type: String,
    required: true,
  },
  reminder: {
    type: Boolean,
    default: false,
  },
});

const TaskModel = mongoose.model("task", TaskSchema);
export default TaskModel;
