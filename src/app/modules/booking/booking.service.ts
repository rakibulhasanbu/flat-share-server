import prisma from "../../utils/prisma";

const createBookingIntoBD = async (user: any, payload: any) => {
  const userId = user?.userId;
  const { flatId, status = "PENDING" } = payload;

  // Create the found item
  const createBooking = await prisma.booking.create({
    data: {
      flatId,
      status,
      userId,
    },
  });

  return createBooking;
};

const getBookingsFromDB = async () => {
  const result = await prisma.booking.findMany();

  return result;
};

const UpdateBookingByIdIntoDB = async (id: any, params: any) => {
  const { status } = params;

  // Update the Booking status
  const updatedBooking = await prisma.booking.update({
    where: {
      id: id,
    },
    data: {
      status,
    },
  });

  return updatedBooking;
};

export const BookingService = {
  createBookingIntoBD,
  getBookingsFromDB,
  UpdateBookingByIdIntoDB,
};
