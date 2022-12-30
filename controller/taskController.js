import asyncHandler from "express-async-handler";
import * as service from "../service/taskService.js";

export const saveNewTask = asyncHandler(async (req, res) => {
  const payload = req.payload;
  if (payload && payload.id) {
    const { text, day, reminder } = req.body;
    if (!text || !day) {
      res.status(400);
      throw new Error("Please provide a task description and a date");
    }

    const savedtask = await service.addNewTask({
      owner: payload.id,
      text,
      day,
      reminder,
    });

    return res.status(200).json(taskResponse(savedtask));
  }

  res.status(401);
  throw new Error("User is unauthorized or authenticated");
});

export const getUserTasks = asyncHandler(async (req, res) => {
  const payload = req.payload;
  if (payload && payload.id) {
    const userTasks = await service.getUserTasks(payload.id);

    return res.status(200).json(userTasks.map((task) => taskResponse(task)));
  }

  res.status(401);
  throw new Error("User is unauthorized or authenticated");
});

const taskResponse = (task) => ({
  id: task.id,
  text: task.text,
  day: task.day,
  reminder: task.reminder,
});
