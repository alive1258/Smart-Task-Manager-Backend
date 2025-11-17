import { Document, Model } from "mongoose";
import { TUser } from "../users/user.interface";

// Type for Token
export interface TToken extends Document {
  user: TUser;
  token: string;
  expiryDate: Date;
}

// Type for Token model
export type TokenModel = Model<TToken, Record<string, unknown>>;

// Login user data type
export type TLoginUser = {
  email: string;
  password: string;
};

// Login response data type
export type TLoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

// Refresh token response data type
export type TRefreshTokenResponse = {
  accessToken: string;
};
