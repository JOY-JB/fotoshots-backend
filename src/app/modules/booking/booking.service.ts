import { Booking, BookingStatus, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IBookingFilterRequest } from './booking.interface';
import { bookingUtils } from './booking.utils';

const createBooking = async (data: Booking): Promise<Booking> => {
  const userExists = await prisma.user.findUnique({
    where: { id: data.userId },
  });
  if (!userExists) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found');
  }

  const serviceExists = await prisma.service.findUnique({
    where: { id: data.serviceId },
  });
  if (!serviceExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }

  const isAvailable = await bookingUtils.checkAvailability(
    data.serviceId,
    data.date,
    data.startTime,
    data.endTime
  );
  if (!isAvailable) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Service is not available at the selected date and time'
    );
  }

  const result = prisma.booking.create({
    data,
  });

  return result;
};

const getAllBookings = async (
  filters: IBookingFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Booking[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const andConditions = [];

  // if (Object.keys(filters).length > 0) {
  //   andConditions.push({
  //     AND: Object.keys(filters).map(key => ({
  //       [key]: {
  //         equals: (filters as any)[key],
  //       },
  //     })),
  //   });
  // }

  if (Object.keys(filters).length > 0) {
    andConditions.push({
      AND: Object.keys(filters).map(key => {
        if (key === 'date') {
          const frontEndDateString = (filters as any)[key];
          const formattedDate = frontEndDateString.substring(0, 10);

          return {
            date: {
              // gte: (filters as any)[key],
              gte: formattedDate + 'T00:00:00Z',
              lt: formattedDate + 'T23:59:59Z',
            },
          };
        } else {
          return {
            [key]: {
              equals: (filters as any)[key],
            },
          };
        }
      }),
    });
  }

  console.log(filters.date);

  const whereConditions: Prisma.BookingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.booking.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    where: whereConditions,
    include: {
      user: true,
      service: true,
    },
  });

  const total = await prisma.booking.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getBookingById = async (id: string): Promise<Booking> => {
  const bookingData = await prisma.booking.findUnique({
    where: {
      id,
    },
  });

  if (!bookingData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Booking not found!');
  }

  return bookingData;
};

const updateBookingById = async (
  id: string,
  payload: Partial<Booking>
): Promise<Booking> => {
  const bookingData = await prisma.booking.findUnique({
    where: {
      id,
    },
  });

  if (!bookingData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Booking not Found!');
  }

  const result = await prisma.booking.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const cancelBookingById = async (
  userId: string,
  bookingId: string
): Promise<Booking> => {
  const bookingData = await prisma.booking.findUnique({
    where: {
      userId,
      id: bookingId,
    },
  });

  if (!bookingData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Booking not found');
  }

  if (bookingData.status !== 'PENDING' && bookingData.status !== 'ACCEPTED') {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Booking cannot be canceled in its current state'
    );
  }

  const result = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: 'CANCELED',
    },
  });

  return result;
};

const getBookingsByUser = async (userId: string): Promise<Booking[]> => {
  const bookings = await prisma.booking.findMany({
    where: {
      userId,
    },
    include: {
      service: true,
    },
  });
  return bookings;
};

const getBookingsByPhotographer = async (id: string): Promise<Booking[]> => {
  const bookings = await prisma.booking.findMany({
    where: {
      service: {
        userId: id,
      },
    },
    include: {
      user: true,
      service: true,
    },
  });
  return bookings;
};

const getBookingsByService = async (serviceId: string): Promise<Booking[]> => {
  const bookings = await prisma.booking.findMany({
    where: {
      serviceId,
    },
  });

  return bookings;
};

const acceptBooking = async (bookingId: string): Promise<Booking> => {
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });

  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  if (booking.status !== BookingStatus.PENDING) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Booking status is not pending');
  }

  const acceptedBooking = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: BookingStatus.ACCEPTED,
    },
  });

  return acceptedBooking;
};

const adjustBooking = async (
  userId: string,
  bookingId: string,
  updatedBookingData: Partial<Booking>
): Promise<Booking> => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId, userId },
  });

  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  if (booking.status !== BookingStatus.PENDING) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Booking status is not pending');
  }

  const dataToUpdate: Record<string, any> = {};

  if (updatedBookingData.date) {
    dataToUpdate.date = updatedBookingData.date;
  }
  if (updatedBookingData.startTime) {
    dataToUpdate.startTime = updatedBookingData.startTime;
  }
  if (updatedBookingData.endTime) {
    dataToUpdate.endTime = updatedBookingData.endTime;
  }

  const adjustedBooking = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      ...dataToUpdate,
      status: BookingStatus.ADJUSTED,
    },
  });

  return adjustedBooking;
};

const rejectBooking = async (bookingId: string): Promise<Booking> => {
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });

  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  if (booking.status !== BookingStatus.PENDING) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Booking status is not pending');
  }

  const rejectedBooking = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: BookingStatus.REJECTED,
    },
  });

  return rejectedBooking;
};

const completeBooking = async (bookingId: string): Promise<Booking> => {
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });

  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  if (booking.status !== BookingStatus.ACCEPTED) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Booking status is not accepted'
    );
  }

  const completedBooking = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: BookingStatus.COMPLETED,
    },
  });

  return completedBooking;
};

const deleteBooking = async (bookingId: string): Promise<Booking> => {
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });

  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  if (booking.status === BookingStatus.COMPLETED) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Cannot delete a completed booking'
    );
  }

  const deletedBooking = await prisma.booking.delete({
    where: { id: bookingId },
  });

  return deletedBooking;
};

export const bookingService = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingById,
  getBookingsByPhotographer,
  cancelBookingById,
  getBookingsByUser,
  getBookingsByService,
  acceptBooking,
  adjustBooking,
  rejectBooking,
  completeBooking,
  deleteBooking,
};
