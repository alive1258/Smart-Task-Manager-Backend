import { Schema, model } from "mongoose";
import { IActivity } from "./activity.interface";

const ActivitySchema = new Schema<IActivity>(
  {
    message: { type: String, required: true },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    task: { type: Schema.Types.ObjectId, ref: "Task" },
  },
  { timestamps: true }
);

export const Activity = model<IActivity>("Activity", ActivitySchema);
