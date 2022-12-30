import express from "express";
import * as controller from "../controller/taskController.js";
import { authenticate } from "../middleware/authService.js";

const taskRoute = express.Router();

taskRoute.post("/", authenticate, controller.saveNewTask);
taskRoute.get("/", authenticate, controller.getUserTasks);

export default taskRoute;
