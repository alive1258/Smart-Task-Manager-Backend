import { Schema, model } from "mongoose";
import { TTeam } from "./team.interface";

// Define the TTeam
const trustUsSchema = new Schema<TTeam>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    linked_in_url: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the TTeam model based on the defined schema
export const Team = model<TTeam>("Team", trustUsSchema);
