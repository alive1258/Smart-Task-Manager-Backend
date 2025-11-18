import { Schema, model } from "mongoose";
import { IProject } from "./project.interface";

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  },
  { timestamps: true }
);

export const Project = model<IProject>("Project", ProjectSchema);
