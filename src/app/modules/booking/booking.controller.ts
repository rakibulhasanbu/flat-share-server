import { Request, Response } from "express";
import { BookingService } from "./booking.service";
import { CatchAsync } from "../../utils/CatchAsync";
import sendResponse from "../../utils/sendResponse";

const createBooking = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req?.user;
    const result = await BookingService.createBookingIntoBD(user, req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  }
);

const getMyBookings = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req?.user;

    const result = await BookingService.getMyBookingsFromDB(user);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Bookings requests  retrieved successfully",
      data: result,
    });
  }
);

const getBookings = CatchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getBookingsFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bookings requests  retrieved successfully",
    data: result,
  });
});

const updateBookingById = CatchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;

  const result = await BookingService.UpdateBookingByIdIntoDB(
    bookingId,
    req.body
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking request updated successfully",
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getBookings,
  getMyBookings,
  updateBookingById,
};
