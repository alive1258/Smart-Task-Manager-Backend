import { Task } from "./task.model";
import { ITask } from "./task.interface";

import httpStatus from "http-status";
import { Project } from "../projects/project.module";
import ApiError from "../../../errors/ApiError";

export const TaskService = {
  createTask: async (ownerId: string, payload: Partial<ITask>) => {
    // Verify project belongs to owner
    const project = await Project.findOne({
      _id: payload.project,
      owner: ownerId,
    });
    if (!project) throw new ApiError(httpStatus.NOT_FOUND, "Project not found");

    const task = await Task.create(payload);
    return task;
  },

  getTasks: async (ownerId: string, filter: any = {}) => {
    // Only fetch tasks for projects owned by this user
    const projects = await Project.find({ owner: ownerId }, { _id: 1 });
    const projectIds = projects.map((p) => p._id);

    return Task.find({ ...filter, project: { $in: projectIds } }).populate(
      "project"
    );
  },

  updateTask: async (
    ownerId: string,
    taskId: string,
    payload: Partial<ITask>
  ) => {
    const task = await Task.findById(taskId).populate("project");
    if (!task || (task.project as any).owner.toString() !== ownerId) {
      throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
    }

    return Task.findByIdAndUpdate(taskId, payload, { new: true });
  },

  deleteTask: async (ownerId: string, taskId: string) => {
    const task = await Task.findById(taskId).populate("project");
    if (!task || (task.project as any).owner.toString() !== ownerId) {
      throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
    }

    return Task.findByIdAndDelete(taskId);
  },
};
