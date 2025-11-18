import { Document, Types } from "mongoose";

export type TTeamMember = {
  name: string;
  role: string;
  capacity: number; // 0–5
};

export interface TTeam extends Document {
  name: string;
  owner: Types.ObjectId;
  members: TTeamMember[];
  createdAt?: Date;
  updatedAt?: Date;
}
