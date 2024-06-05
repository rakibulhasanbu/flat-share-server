import prisma from "../../utils/prisma";

const createBookingIntoBD = async (user: any, payload: any) => {
  const userId = user?.userId;
  const { flatId, status = "PENDING", message } = payload;

  // Create the found item
  const createBooking = await prisma.booking.create({
    data: {
      flatId,
      status,
      userId,
      message,
    },
  });

  return createBooking;
};

const getMyBookingsFromDB = async (user: any) => {
  const result = await prisma.booking.findMany({
    where: { userId: user?.userId },
    include: {
      flat: {
        select: {
          photos: true,
          description: true,
          advanceAmount: true,
          amenities: true,
          amount: true,
          availability: true,
          bookings: true,
          location: true,
          postedBy: true,
          squareFeet: true,
          totalRooms: true,
          createdAt: true,
          totalBedrooms: true,
          postedById: true,
          id: true,
          updatedAt: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  return result;
};

const getBookingsFromDB = async () => {
  const result = await prisma.booking.findMany({
    include: {
      flat: {
        select: {
          photos: true,
          description: true,
          advanceAmount: true,
          amenities: true,
          amount: true,
          availability: true,
          bookings: true,
          location: true,
          postedBy: true,
          squareFeet: true,
          totalRooms: true,
          createdAt: true,
          totalBedrooms: true,
          postedById: true,
          id: true,
          updatedAt: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
  });

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
  getMyBookingsFromDB,
  UpdateBookingByIdIntoDB,
};
