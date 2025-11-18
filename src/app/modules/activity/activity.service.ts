import { Activity } from "./activity.model";

export const ActivityService = {
  log: async (projectId: string, message: string, taskId?: string) => {
    const activity = await Activity.create({
      project: projectId,
      message,
      task: taskId,
    });
    return activity;
  },

  getRecent: async (projectId: string, limit = 10) => {
    return Activity.find({ project: projectId })
      .sort({ createdAt: -1 })
      .limit(limit);
  },
};
