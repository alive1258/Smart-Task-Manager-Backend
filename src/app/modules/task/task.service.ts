// import { Task } from "./task.model";
// import { ITask } from "./task.interface";

// import httpStatus from "http-status";
// import { Project } from "../projects/project.module";
// import ApiError from "../../../errors/ApiError";
// import { ActivityService } from "../activity/activity.service";

// export const TaskService = {
//   createTask: async (ownerId: string, payload: Partial<ITask>) => {
//     // Verify project belongs to owner
//     const project = await Project.findOne({
//       _id: payload.project,
//       owner: ownerId,
//     });
//     if (!project) throw new ApiError(httpStatus.NOT_FOUND, "Project not found");

//     const task = await Task.create(payload);
//     return task;
//   },

//   getTasks: async (ownerId: string, filter: any = {}) => {
//     // Only fetch tasks for projects owned by this user
//     const projects = await Project.find({ owner: ownerId }, { _id: 1 });
//     const projectIds = projects.map((p) => p._id);

//     return Task.find({ ...filter, project: { $in: projectIds } }).populate(
//       "project"
//     );
//   },

//   updateTask: async (
//     ownerId: string,
//     taskId: string,
//     payload: Partial<ITask>
//   ) => {
//     const task = await Task.findById(taskId).populate("project");
//     if (!task || (task.project as any).owner.toString() !== ownerId) {
//       throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
//     }

//     return Task.findByIdAndUpdate(taskId, payload, { new: true });
//   },

//   // Auto-reassign tasks exceeding capacity
//   autoReassign: async (ownerId: string, projectId: string) => {
//     const project = await Project.findOne({
//       _id: projectId,
//       owner: ownerId,
//     }).lean();
//     if (!project) throw new ApiError(httpStatus.NOT_FOUND, "Project not found");

//     const tasks = await Task.find({ project: projectId }).lean();
//     const members = (project as any).members as any[];

//     // Count current task load per member
//     const taskCount: Record<string, number> = {};
//     members.forEach(
//       (m) =>
//         (taskCount[m.name] = tasks.filter(
//           (t) => t.assignedMember?.name === m.name
//         ).length)
//     );

//     // Auto reassign Low/Medium priority tasks exceeding capacity
//     for (const task of tasks) {
//       if (!task.assignedMember) continue;
//       const member = members.find((m) => m.name === task.assignedMember!.name);
//       if (!member) continue;
//       if (task.priority === "High") continue; // don't move high priority
//       if (taskCount[member.name] > member.capacity) {
//         // Find free member
//         const freeMember = members.find((m) => taskCount[m.name] < m.capacity);
//         if (freeMember) {
//           const oldMember = task.assignedMember.name;
//           await Task.findByIdAndUpdate(task._id, {
//             assignedMember: {
//               userId: freeMember._id,
//               name: freeMember.name,
//               role: freeMember.role,
//             },
//           });
//           taskCount[member.name]--;
//           taskCount[freeMember.name]++;

//           await ActivityService.log(
//             projectId,
//             `Task "${task.title}" reassigned from ${oldMember} to ${freeMember.name}`,
//             task._id.toString()
//           );
//         }
//       }
//     }

//     return { message: "Tasks reassigned successfully" };
//   },

//   deleteTask: async (ownerId: string, taskId: string) => {
//     const task = await Task.findById(taskId).populate("project");
//     if (!task || (task.project as any).owner.toString() !== ownerId) {
//       throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
//     }

//     return Task.findByIdAndDelete(taskId);
//   },
// };
import { Task } from "./task.model";
import { ITask, ITaskCreatePayload } from "./task.interface";

import httpStatus from "http-status";
import { Project } from "../projects/project.module";
import ApiError from "../../../errors/ApiError";
import { ActivityService } from "../activity/activity.service";

export const TaskService = {
  // ============================================================
  // 1. CREATE TASK
  // ============================================================
  createTask: async (
    ownerId: string,
    payload: ITaskCreatePayload
  ): Promise<any> => {
    const { assignedMember, forceAssign, autoAssign } = payload;

    // ---- Validate project ----
    const project = await Project.findOne({
      _id: payload.project,
      owner: ownerId,
    }).populate("team");

    if (!project) throw new ApiError(httpStatus.NOT_FOUND, "Project not found");

    const team = project.team as any;

    // -------------------- AUTO ASSIGN --------------------
    if (autoAssign) {
      let bestMember: any = null;

      for (const m of team.members) {
        const taskCount = await Task.countDocuments({
          "assignedMember.userId": m._id,
        });

        if (!bestMember || taskCount < bestMember.taskCount) {
          bestMember = { ...m, taskCount };
        }
      }

      payload.assignedMember = {
        userId: bestMember._id,
        name: bestMember.name,
        role: bestMember.role,
      };
    }

    // -------------------- Manual Assign Check --------------------
    if (assignedMember) {
      const member = team.members.find(
        (m: any) => m.name === assignedMember.name
      );

      if (!member) {
        throw new ApiError(400, "Assigned member is not part of this team.");
      }

      // 3. Count current tasks of the member that are not done
      const tasksCount = await Task.countDocuments({
        project: payload.project, // <-- corrected
        "assignedMember.userId": assignedMember.userId,
        status: { $ne: "Done" },
      });
      // 4. Compare with member capacity
      if (!forceAssign && tasksCount >= member.capacity) {
        return {
          overCapacity: true,
          message: `${member.name} has ${tasksCount} tasks but capacity is ${member.capacity}. Assign anyway?`,
          currentTasks: tasksCount,
          capacity: member.capacity,
        };
      }

      if (!forceAssign && tasksCount >= member.capacity) {
        return {
          overCapacity: true,
          message: `${member.name} has ${tasksCount} tasks but capacity is ${member.capacity}. Assign anyway?`,
          currentTasks: tasksCount,
          capacity: member.capacity,
        };
      }
      // Set assignedMember payload
      payload.assignedMember = {
        userId: member._id,
        name: member.name,
        role: member.role,
      };
    }

    // ---- Create Task ----
    const task = await Task.create(payload);

    await ActivityService.log(
      (project!._id as any).toString(),
      `Task "${task.title}" created and assigned.`,
      (task!._id as any).toString()
    );

    return task;
  },

  // ============================================================
  // 2. GET TASKS
  // ============================================================

  getTasks: async (ownerId: string, filter: any = {}) => {
    const projects = await Project.find({ owner: ownerId }, { _id: 1 });
    const projectIds = projects.map((p) => p._id);

    return Task.find({
      ...filter,
      project: { $in: projectIds },
    })
      .populate({
        path: "project",
        select: "name owner team",
        populate: {
          path: "team",
          select: "name members owner",
        },
      })
      .populate({
        path: "assignedMember.userId",
        select: "name role",
      });
  },

  // ============================================================
  // 3. UPDATE TASK
  // ============================================================
  updateTask: async (
    ownerId: string,
    taskId: string,
    payload: Partial<ITask>
  ) => {
    const task = await Task.findById(taskId).populate("project");
    if (!task || String((task.project as any).owner) !== ownerId) {
      throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
    }

    return Task.findByIdAndUpdate(taskId, payload, { new: true });
  },

  // ============================================================
  // 4. AUTO REASSIGN
  // ============================================================
  autoReassign: async (ownerId: string, projectId: string) => {
    const project = await Project.findOne({
      _id: projectId,
      owner: ownerId,
    }).populate("team");

    if (!project) throw new ApiError(httpStatus.NOT_FOUND, "Project not found");

    const tasks = await Task.find({ project: projectId }).lean();
    const members = (project.team as any).members as any[];

    // Load Map
    const loadMap: Record<string, number> = {};

    for (const m of members) {
      loadMap[String(m._id)] = tasks.filter(
        (t) => String(t.assignedMember?.userId) === String(m._id)
      ).length;
    }

    const changes: any[] = [];

    // Reassign Logic
    for (const task of tasks) {
      if (!task.assignedMember) continue;

      const currentMemberId = String(task.assignedMember.userId);
      const member = members.find((m) => String(m._id) === currentMemberId);

      if (!member) continue;
      if (task.priority === "High") continue;

      const memberLoad = loadMap[String(member._id)];

      if (memberLoad > member.capacity) {
        const freeMember = members.find(
          (m) => loadMap[String(m._id)] < m.capacity
        );

        if (freeMember) {
          await Task.findByIdAndUpdate(task._id, {
            assignedMember: {
              userId: freeMember._id,
              name: freeMember.name,
              role: freeMember.role,
            },
          });

          loadMap[String(member._id)]--;
          loadMap[String(freeMember._id)]++;

          await ActivityService.log(
            projectId,
            `Task "${task.title}" reassigned from ${member.name} to ${freeMember.name}`,
            task._id.toString()
          );

          changes.push({
            task: task.title,
            from: member.name,
            to: freeMember.name,
          });
        }
      }
    }

    return {
      success: true,
      message: "Tasks reassigned successfully",
      changes,
    };
  },

  // ============================================================
  // 5. DELETE TASK
  // ============================================================
  deleteTask: async (ownerId: string, taskId: string) => {
    const task = await Task.findById(taskId).populate("project");

    if (!task || String((task.project as any).owner) !== ownerId) {
      throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
    }

    return Task.findByIdAndDelete(taskId);
  },
};
