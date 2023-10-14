import { Review } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createReview = async (data: Review): Promise<Review> => {
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

  const hasBooking = await prisma.booking.findFirst({
    where: {
      userId: data.userId,
      serviceId: data.serviceId,
      status: 'COMPLETED',
    },
  });
  if (!hasBooking) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "You can't leave a review for this service"
    );
  }

  const result = prisma.review.create({
    data,
  });

  return result;
};

export const reviewService = {
  createReview,
};
