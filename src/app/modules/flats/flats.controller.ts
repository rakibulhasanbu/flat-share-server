import { Request, Response } from "express";
import { FlatService } from "./flats.service";
import { CatchAsync } from "../../utils/CatchAsync";
import sendResponse from "../../utils/sendResponse";

const createFlat = CatchAsync(async (req: Request, res: Response) => {
  const result = await FlatService.createFlatIntoBD(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Flat created successfully",
    data: result,
  });
});

const getFlats = CatchAsync(async (req: Request, res: Response) => {
  const result = await FlatService.getFlatsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Flats retrieved successfully",
    data: result,
  });
});

const updateFlatById = CatchAsync(async (req: Request, res: Response) => {
  const { flatId } = req.params;

  const result = await FlatService.UpdateFlatByIdIntoDB(flatId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Flat information updated successfully",
    data: result,
  });
});

export const FlatController = {
  createFlat,
  getFlats,
  updateFlatById,
};
