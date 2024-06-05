import { Request, Response } from "express";
import { userService } from "./user.sevice";
import sendResponse from "../../utils/sendResponse";
import { CatchAsync } from "../../utils/CatchAsync";
import httpStatus from "http-status";

const createUser = CatchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUserIntoBD(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const getProfile = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;

    const result = await userService.getProfileFromDB(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User profile retrieved successfully",
      data: result,
    });
  }
);

const getUsers = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;

    const result = await userService.getAllUsersFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User users retrieved successfully",
      data: result,
    });
  }
);

const updateProfile = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;

    const result = await userService.UpdateProfileIntoDB(user, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User profile updated successfully",
      data: result,
    });
  }
);

const updateUser = CatchAsync(async (req: Request, res: Response) => {
  const result = await userService.UpdateUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

export const userController = {
  createUser,
  getProfile,
  getUsers,
  updateProfile,
  updateUser,
};
