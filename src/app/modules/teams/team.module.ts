import { Schema, model } from "mongoose";
import { TTeam, TTeamMember } from "./team.interface";

const TeamMemberSchema = new Schema<TTeamMember>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    capacity: { type: Number, required: true, min: 0, max: 5 },
  },
  { _id: false }
);

const TeamSchema = new Schema<TTeam>(
  {
    name: { type: String, required: true },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: {
      type: [TeamMemberSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export const Team = model<TTeam>("Team", TeamSchema);
