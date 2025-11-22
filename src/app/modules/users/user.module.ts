import { Schema, model, Query, Document, Types } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser, UserModel>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true, maxlength: 20 },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    email: { type: String, required: true, unique: true, trim: true },
    id: {
      type: String,
      unique: true,
      default: () => new Types.ObjectId().toString(),
    },
  },
  { timestamps: true }
);

// Pre-save: hash password
userSchema.pre("save", async function (next) {
  const user = this as TUser;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// Remove password after save
userSchema.post<TUser>("save", async function (doc, next) {
  doc.password = "";
  next();
});

// Pre-find to exclude deleted
userSchema.pre<Query<TUser & Document, TUser>>("find", function (next) {
  this.where({ isDeleted: { $ne: true } }).select("-password");
  next();
});

userSchema.pre<Query<TUser & Document, TUser>>("findOne", function (next) {
  this.where({ isDeleted: { $ne: true } }).select("-password");
  next();
});

// Static method
userSchema.statics.isUserExists = async function (email: string) {
  return await User.findOne({ email });
};

export const User = model<TUser, UserModel>("User", userSchema);
