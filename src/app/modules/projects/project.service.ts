import { IProject } from "./project.interface";
import httpStatus from "http-status";
import { Project } from "./project.module";
import ApiError from "../../../errors/ApiError";
import { Team } from "../teams/team.module";

export const ProjectService = {
  createProject: async (ownerId: string, payload: Partial<IProject>) => {
    const project = await Project.create({ ...payload, owner: ownerId });
    return project;
  },

  getAllProjects: async (ownerId: string) => {
    return Project.find({ owner: ownerId }).populate("team");
  },

  getProjectById: async (ownerId: string, projectId: string) => {
    const project = await Project.findOne({
      _id: projectId,
      owner: ownerId,
    }).populate("team");
    if (!project) throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
    return project;
  },

  updateProject: async (
    ownerId: string,
    projectId: string,
    payload: Partial<IProject>
  ) => {
    const project = await Project.findOneAndUpdate(
      { _id: projectId, owner: ownerId },
      payload,
      { new: true }
    );
    if (!project) throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
    return project;
  },

  deleteProject: async (ownerId: string, projectId: string) => {
    const project = await Project.findOneAndDelete({
      _id: projectId,
      owner: ownerId,
    });
    if (!project) throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
    return project;
  },
};
