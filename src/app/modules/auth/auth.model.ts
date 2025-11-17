import mongoose, { model, Schema } from "mongoose";
import { TToken, TokenModel } from "./auth.interface";

// token schema
const tokenSchema: Schema<TToken> = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    expiryDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

// export the token
export const Token = model<TToken, TokenModel>("Token", tokenSchema);
