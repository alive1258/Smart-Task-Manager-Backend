import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

import { TeamServices } from "./team.service";

// Controller to handle Team creation
const createTeam = catchAsync(async (req, res) => {
  const teamData = req.body;

  const result = await TeamServices.createTeamIntoDB(teamData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team created successfully",
    data: result,
  });
});

// Controller to handle retrieving all heroes
const getAllTeam = catchAsync(async (req, res) => {
  const result = await TeamServices.getAllTeamFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single Team by ID
const getSingleTeam = catchAsync(async (req, res) => {
  const { teamId } = req.params;
  const result = await TeamServices.getSingleTeamFromDB(teamId);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Team data not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Team retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a team by ID
const updateTeam = catchAsync(async (req, res) => {
  const { teamId } = req.params;
  const updateData = req.body;
  const result = await TeamServices.updateTeamInDB(teamId, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "team updated successfully",
    data: result,
  });
});

// Controller to handle deleting a teamId by ID
const deleteTeam = catchAsync(async (req, res) => {
  const { teamId } = req.params;
  const result = await TeamServices.deleteTeamFromDB(teamId);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Team not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team deleted successfully",
    data: "",
  });
});

export const TeamControllers = {
  createTeam,
  getAllTeam,
  getSingleTeam,
  updateTeam,
  deleteTeam,
};
