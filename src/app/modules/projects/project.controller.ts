import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { ProjectService } from "./project.service";

export const ProjectController = {
  createProject: catchAsync(async (req: Request, res: Response) => {
    const ownerId = req.user?._id as string;
    const project = await ProjectService.createProject(ownerId, req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Project created successfully",
      data: project,
    });
  }),

  getAllProjects: catchAsync(async (req: Request, res: Response) => {
    const ownerId = req.user?._id as string;

    const projects = await ProjectService.getAllProjects(ownerId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Projects retrieved successfully",
      data: projects,
    });
  }),

  getProjectById: catchAsync(async (req: Request, res: Response) => {
    const ownerId = req.user?._id as string;
    const project = await ProjectService.getProjectById(ownerId, req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Project retrieved successfully",
      data: project,
    });
  }),

  updateProject: catchAsync(async (req: Request, res: Response) => {
    const ownerId = req.user?._id as string;
    const project = await ProjectService.updateProject(
      ownerId,
      req.params.id,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  }),

  deleteProject: catchAsync(async (req: Request, res: Response) => {
    const ownerId = req.user?._id as string;
    const project = await ProjectService.deleteProject(ownerId, req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Project deleted successfully",
      data: project,
    });
  }),
};
