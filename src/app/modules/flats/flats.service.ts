import prisma from "../../utils/prisma";

const createFlatIntoBD = async (user: any, payload: any) => {
  const {
    squareFeet,
    totalBedrooms,
    totalRooms,
    location,
    description,
    amount,
    amenities,
    photos,
    advanceAmount,
    postedById = user?.userId,
    availability = true,
  } = payload;

  // Create the found item
  const createFlat = await prisma.flat.create({
    data: {
      location,
      description,
      amount,
      squareFeet,
      totalBedrooms,
      totalRooms,
      amenities,
      photos,
      advanceAmount,
      availability,
      postedById,
    },
  });

  return createFlat;
};

const getFlatsFromDB = async (query: any) => {
  const { searchTerm, page = 1, limit = 10, totalBedrooms } = query;
  console.log(totalBedrooms);
  // Prepare filters
  let where: any = {};

  if (searchTerm) {
    where = {
      location: { contains: searchTerm as string, mode: "insensitive" },
    };
  }

  const parsedTotalBedrooms = Number(totalBedrooms);
  if (!isNaN(parsedTotalBedrooms) && parsedTotalBedrooms > 0) {
    where.totalBedrooms = parsedTotalBedrooms;
  }

  // Retrieve paginated and filtered found items
  const foundItems = await prisma.flat.findMany({
    where,
    take: Number(limit),
    skip: (Number(page) - 1) * Number(limit),
  });

  const total = await prisma.flat.count({ where });

  const responseData = {
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
    },
    data: foundItems,
  };

  return responseData;
};

const getMyFlatFromDB = async (user: any) => {
  // Update the Blog status
  const blog = await prisma.flat.findMany({
    where: {
      postedById: user?.userId,
    },
    include: {
      postedBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return blog;
};

const UpdateFlatByIdIntoDB = async (id: any, params: any) => {
  const {
    advanceAmount,
    availability,
    description,
    location,
    amount,
    squareFeet,
    totalBedrooms,
    totalRooms,
    amenities,
    photos,
  } = params;

  // Update the Flat status
  const updatedFlat = await prisma.flat.update({
    where: {
      id: id,
    },
    data: {
      advanceAmount,
      availability,
      description,
      location,
      amount,
      photos,
      squareFeet,
      totalBedrooms,
      totalRooms,
      amenities,
    },
  });

  return updatedFlat;
};

const getFlatByIdFromDB = async (id: any) => {
  return await prisma.flat.findFirst({
    where: {
      id: id,
    },
  });
};

const deleteFlatByIdIntoDB = async (id: any) => {
  return await prisma.flat.delete({
    where: {
      id: id,
    },
  });
};

export const FlatService = {
  createFlatIntoBD,
  getFlatsFromDB,
  UpdateFlatByIdIntoDB,
  deleteFlatByIdIntoDB,
  getFlatByIdFromDB,
  getMyFlatFromDB,
};
