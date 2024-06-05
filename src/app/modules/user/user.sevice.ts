import * as bcrypt from "bcrypt";
import prisma from "../../utils/prisma";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import { config } from "../../config";
import { jwtHelpers } from "../../helpars/jwtHelpers";

const createUserIntoBD = async (data: any) => {
  const { name, email, password, username } = data;

  const existingUserEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUserEmail) {
    throw new ApiError(httpStatus.NOT_FOUND, "Email already in use.");
  }
  const existingUserName = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUserName) {
    throw new ApiError(httpStatus.NOT_FOUND, "Username already in use.");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const userData = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      name,
    },
  });
  // Omit the password in the response
  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
      userId: userData.id,
      userName: userData.name,
    },
    config.jwt_access_secret as Secret,
    config.jwt_expires_in as string
  );

  const { password: _, ...user } = userData;

  const responsesData = {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    accessToken,
  };
  return responsesData;
};

const getProfileFromDB = async (user: any) => {
  const userProfileData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.userId,
    },
  });

  const { password: _, ...userData } = userProfileData;
  return userData;
};

const getAllUsersFromDB = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      isActive: true,
      role: true,
    },
  });

  return users;
};

const UpdateProfileIntoDB = async (user: any, params: any) => {
  const { email, username, name } = params;
  const updatedProfile = await prisma.user.update({
    where: {
      id: user.userId,
    },
    data: {
      name,
      email,
      username,
    },
  });
  return updatedProfile;
};
const UpdateUserIntoDB = async (params: any) => {
  const { id, isActive, role } = params;
  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      isActive,
      role,
    },
  });
  return updatedUser;
};

export const userService = {
  createUserIntoBD,
  getProfileFromDB,
  UpdateUserIntoDB,
  getAllUsersFromDB,
  UpdateProfileIntoDB,
};
