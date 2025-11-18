import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Team } from "./team.module";
import { TTeam } from "./team.interface";

const createTeamIntoDB = async (ownerId: string, payload: Partial<TTeam>) => {
  const result = await Team.create({
    name: payload.name,
    owner: ownerId,
    members: payload.members || [],
  });
  return result;
};

const getAllTeamsFromDB = async (ownerId: string) => {
  return await Team.find({ owner: ownerId });
};

const getSingleTeamFromDB = async (teamId: string, ownerId: string) => {
  const team = await Team.findOne({ _id: teamId, owner: ownerId });
  if (!team) throw new ApiError(httpStatus.NOT_FOUND, "Team not found");
  return team;
};

const updateTeamInDB = async (
  teamId: string,
  ownerId: string,
  updateData: Partial<TTeam>
) => {
  const updated = await Team.findOneAndUpdate(
    { _id: teamId, owner: ownerId },
    updateData,
    { new: true }
  );
  if (!updated) throw new ApiError(httpStatus.NOT_FOUND, "Team not found");
  return updated;
};

const deleteTeamFromDB = async (teamId: string, ownerId: string) => {
  const deleted = await Team.findOneAndDelete({ _id: teamId, owner: ownerId });
  if (!deleted) throw new ApiError(httpStatus.NOT_FOUND, "Team not found");
  return deleted;
};

export const TeamServices = {
  createTeamIntoDB,
  getAllTeamsFromDB,
  getSingleTeamFromDB,
  updateTeamInDB,
  deleteTeamFromDB,
};
