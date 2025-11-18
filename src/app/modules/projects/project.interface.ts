import { Document, Types } from "mongoose";

export interface IProject extends Document {
  name: string;
  owner: Types.ObjectId; // User ID
  team: Types.ObjectId; // Team ID
  createdAt?: Date;
  updatedAt?: Date;
}
