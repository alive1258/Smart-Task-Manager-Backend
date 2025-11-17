import { User } from "./user.module";
import { TUser, TUserFilters } from "./user.interface";
import { TPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { userFilterableFields } from "./user.constant";
import { TGenericResponse } from "../../../interfaces/common";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { SortOrder } from "mongoose";

// Create user
const createUserIntoDB = async (userData: TUser) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser)
    throw new ApiError(httpStatus.CONFLICT, "User already exists");
  return await User.create(userData);
};

// Get all users
const getAllUsersFromDB = async (
  filters: TUserFilters,
  paginationOptions: TPaginationOptions
): Promise<TGenericResponse<TUser[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions: any[] = [];
  if (searchTerm) {
    andConditions.push({
      $or: userFilterableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: "i" },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: { $regex: `^${value}$`, $options: "i" },
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) sortConditions[sortBy] = sortOrder;

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const data = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await User.countDocuments(whereConditions);

  return { meta: { page, limit, total }, data };
};

// Get single user
const getSingleUserFromDB = async (_id: string) => {
  if (!_id) throw new ApiError(httpStatus.BAD_REQUEST, "User ID is required");
  const user = await User.findById(_id);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  return user;
};

// Update user
const updateUserInDB = async (_id: string, updateData: Partial<TUser>) => {
  const user = await User.findByIdAndUpdate(_id, updateData, { new: true });
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  return user;
};

// Soft delete user
const deleteUserFromDB = async (_id: string) => {
  const result = await User.updateOne({ _id }, { isDeleted: true });
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
};
