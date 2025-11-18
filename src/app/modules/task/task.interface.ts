import { Document, Types } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  project: Types.ObjectId; // Project ID
  assignedMember?: {
    userId: Types.ObjectId; // Optional member ID
    name: string;
    role: string;
  };
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Done";
  createdAt?: Date;
  updatedAt?: Date;
}
