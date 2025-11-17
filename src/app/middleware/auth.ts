import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import config from "../config";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get the authorization token from header
    const tokenAll = req.headers.authorization;
    const token = tokenAll?.split(" ")[1];

    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized.");
    }

    // Verify the token
    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    // Attach verified user to request
    req.user = verifiedUser;

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
