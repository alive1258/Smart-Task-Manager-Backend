import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

// Login
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await AuthService.loginUserService({ email, password });

  // Set refreshToken in httpOnly cookie
  // res.cookie("refreshToken", result.refreshToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "strict",
  //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  // });

  // Send accessToken in response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully.",
    data: result,
  });
});

// Refresh token
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  console.log(refreshToken, "refreshToken,,,,,,,,,,,,,,");

  const result = await AuthService.refreshTokenService(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New access token generated!",
    data: result,
  });
});

// Logout
const logoutUser = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged out successfully!",
    data: null,
  });
});

export const AuthController = { loginUser, refreshToken, logoutUser };
