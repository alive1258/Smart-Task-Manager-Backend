import { Document, Types } from "mongoose";

export interface IActivity extends Document {
  message: string;
  project: Types.ObjectId;
  task?: Types.ObjectId;
  createdAt?: Date;
}
