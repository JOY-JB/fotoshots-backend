import { Booking } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
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

export const bookingService = {
  createBooking,
};
