import { Feedback } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createFeedback = async (data: Feedback): Promise<Feedback> => {
  const serviceExists = await prisma.service.findUnique({
    where: { id: data.serviceId },
  });
  if (!serviceExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }

  const hasCompletedBooking = await prisma.booking.findFirst({
    where: {
      userId: data.userId,
      serviceId: data.serviceId,
      status: 'COMPLETED',
    },
  });

  if (!hasCompletedBooking) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You can't leave feedback for this service until you've completed a booking."
    );
  }

  const result = prisma.feedback.create({
    data,
  });

  return result;
};

const getFeedbacksByService = async (
  serviceId: string
): Promise<Feedback[]> => {
  const feedback = await prisma.feedback.findMany({
    where: {
      serviceId: serviceId,
    },
    include: {
      user: true,
    },
  });

  return feedback;
};

const updateFeedbackById = async (
  id: string,
  payload: Partial<Feedback>
): Promise<Feedback> => {
  const feedbackData = await prisma.feedback.findUnique({
    where: {
      id,
    },
  });

  if (!feedbackData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found for update.');
  }

  const result = await prisma.feedback.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteFeedbackById = async (id: string): Promise<Feedback> => {
  const feedbackData = await prisma.feedback.findUnique({
    where: {
      id,
    },
  });

  if (!feedbackData) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Feedback not found for deletion.'
    );
  }

  const result = await prisma.feedback.delete({
    where: {
      id,
    },
  });
  return result;
};

export const feedbackService = {
  createFeedback,
  getFeedbacksByService,
  updateFeedbackById,
  deleteFeedbackById,
};
