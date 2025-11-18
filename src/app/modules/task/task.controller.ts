import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { TaskService } from "./task.service";

export const TaskController = {
  createTask: catchAsync(async (req: Request, res: Response) => {
    const ownerId = req.user?._id as string;
    const task = await TaskService.createTask(ownerId, req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Task created successfully",
      data: task,
    });
  }),

  getTasks: catchAsync(async (req: Request, res: Response) => {
    const ownerId = req.user?._id as string;
    const tasks = await TaskService.getTasks(ownerId, req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  }),

  updateTask: catchAsync(async (req: Request, res: Response) => {
    const ownerId = req.user?._id as string;
    const task = await TaskService.updateTask(ownerId, req.params.id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  }),

  deleteTask: catchAsync(async (req: Request, res: Response) => {
    const ownerId = req.user?._id as string;
    const task = await TaskService.deleteTask(ownerId, req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Task deleted successfully",
      data: task,
    });
  }),

  autoReassignTasks: catchAsync(async (req: Request, res: Response) => {
    const ownerId = req.user?._id as string;
    const projectId = req.params.projectId;
    const result = await TaskService.autoReassign(ownerId, projectId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: result.message,
      data: undefined,
    });
  }),
};
