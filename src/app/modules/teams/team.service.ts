import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { TTeam } from "./team.interface";
import { Team } from "./team.module";

// Service to create a new Team in the database
const createTeamIntoDB = async (heroData: TTeam) => {
  const result = await Team.create(heroData);

  return result;
};

// Service to retrieve all Team from the database
const getAllTeamFromDB = async () => {
  const result = await Team.find();
  return result;
};

// Service to retrieve a single Team from the database by ID
const getSingleTeamFromDB = async (_id: string) => {
  const result = await Team.findOne({ _id });
  return result;
};

// Service to update a Team in the database by ID
const updateTeamInDB = async (_id: string, updateData: Partial<TTeam>) => {
  const result = await Team.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Team Data not found");
  }

  return result;
};

// Service to delete a Team from the database by ID
const deleteTeamFromDB = async (_id: string) => {
  const result = await Team.findByIdAndDelete(_id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Team Data not found");
  }

  return result;
};

// Export the Team services as an object for use in other parts of the application
export const TeamServices = {
  createTeamIntoDB,
  getAllTeamFromDB,
  getSingleTeamFromDB,
  updateTeamInDB,
  deleteTeamFromDB,
};
