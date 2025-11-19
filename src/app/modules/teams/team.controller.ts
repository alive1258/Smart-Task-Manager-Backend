import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { TeamServices } from "./team.service";

const createTeam = catchAsync(async (req: Request, res: Response) => {
  // If user is logged in via auth middleware, use their _id
  const ownerId: string = req.user?._id as string;
  const result = await TeamServices.createTeamIntoDB(ownerId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Team created successfully",
    data: result,
  });
});

const getAllTeams = catchAsync(async (req: Request, res: Response) => {
  const ownerId: string = req.user?._id as string;

  const result = await TeamServices.getAllTeamsFromDB(ownerId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Teams retrieved successfully",
    data: result,
  });
});

const getSingleTeam = catchAsync(async (req: Request, res: Response) => {
  const ownerId: string = req.user?._id as string;
  const { id } = req.params;
  const result = await TeamServices.getSingleTeamFromDB(id, ownerId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team retrieved successfully",
    data: result,
  });
});

const updateTeam = catchAsync(async (req: Request, res: Response) => {
  const ownerId: string = req.user?._id as string;
  const { id } = req.params;
  const result = await TeamServices.updateTeamInDB(id, ownerId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team updated successfully",
    data: result,
  });
});

const deleteTeam = catchAsync(async (req: Request, res: Response) => {
  const ownerId: string = req.user?._id as string;
  const { id } = req.params;
  await TeamServices.deleteTeamFromDB(id, ownerId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team deleted successfully",
    data: null,
  });
});

export const TeamControllers = {
  createTeam,
  getAllTeams,
  getSingleTeam,
  updateTeam,
  deleteTeam,
};
