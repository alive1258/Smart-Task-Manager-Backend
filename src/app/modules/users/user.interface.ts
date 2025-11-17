import { Document, Model } from "mongoose";

export type TUser = Document & {
  name: string; // just a single name field
  password: string;
  gender: "male" | "female" | "other";
  email: string;
  isDeleted: boolean;
};

// Static methods interface
export interface UserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser | null>;
}

// Filters
export type TUserFilters = {
  searchTerm?: string;
  name?: string;
  email?: string;
};
