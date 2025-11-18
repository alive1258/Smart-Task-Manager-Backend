import { Schema, model } from "mongoose";
import { ITask } from "./task.interface";

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    assignedMember: {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      name: { type: String },
      role: { type: String },
    },
    priority: { type: String, enum: ["Low", "Medium", "High"], required: true },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Done"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Task = model<ITask>("Task", TaskSchema);
