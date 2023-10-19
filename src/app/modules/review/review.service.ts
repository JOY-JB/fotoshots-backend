import { Review } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createReview = async (data: Review): Promise<Review> => {
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

const getAllReviews = async (): Promise<Review[]> => {
  const reviews = await prisma.review.findMany({
    include: {
      user: true,
    },
  });

  return reviews;
};

const getReviewsByUser = async (userId: string): Promise<Review[]> => {
  const reviews = await prisma.review.findMany({
    where: {
      userId,
    },
    include: {
      user: true,
      service: true,
    },
  });

  return reviews;
};

const getReviewsByService = async (serviceId: string): Promise<Review[]> => {
  const reviews = await prisma.review.findMany({
    where: {
      serviceId: serviceId,
    },
    include: {
      user: true,
    },
  });

  return reviews;
};

const updateReviewById = async (
  id: string,
  payload: Partial<Review>
): Promise<Review> => {
  const reviewData = await prisma.review.findUnique({
    where: {
      id,
    },
  });

  if (!reviewData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found for update.');
  }

  const result = await prisma.review.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteReviewById = async (id: string): Promise<Review> => {
  const reviewData = await prisma.review.findUnique({
    where: {
      id,
    },
  });

  if (!reviewData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found for deletion.');
  }

  const result = await prisma.review.delete({
    where: {
      id,
    },
  });
  return result;
};

export const reviewService = {
  createReview,
  getReviewsByService,
  updateReviewById,
  deleteReviewById,
  getAllReviews,
  getReviewsByUser,
};
