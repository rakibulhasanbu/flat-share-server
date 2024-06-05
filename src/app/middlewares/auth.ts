import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../utils/CatchAsync";
import { TUserRole } from "../modules/user/user.interface";
import ApiError from "../errors/ApiError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import prisma from "../utils/prisma";

const auth = (...roles: TUserRole[]) => {
  return CatchAsync(
    async (
      req: Request & { user?: any },
      res: Response,
      next: NextFunction
    ) => {
      //if the token is send from the client
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(401, "You are not Authorized!");
      }

      //check if the token is valid
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;

      const user = await prisma.user.findFirst({
        where: {
          id: decoded?.userId,
        },
      });
      if (!user) {
        throw new ApiError(401, `Your provided Token is not valid user!`);
      }

      //checking required role are write or wrong
      if (roles && !roles.includes(decoded.role)) {
        throw new ApiError(401, "You are not Authorized!");
      }

      req.user = decoded as JwtPayload;

      next();
    }
  );
};

export default auth;
