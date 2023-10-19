import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { reviewService } from './review.service';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as any;
  const payload = req.body;

  const result = await reviewService.createReview({ ...payload, userId });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review created successfully',
    data: result,
  });
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const reviews = await reviewService.getAllReviews();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews fetched successfully!',
    data: reviews,
  });
});

const getReviewsByService = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params;

  const reviews = await reviewService.getReviewsByService(serviceId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews fetched successfully!',
    data: reviews,
  });
});

const updateReviewById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const updatedReview = await reviewService.updateReviewById(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review updated successfully',
    data: updatedReview,
  });
});

const deleteReviewById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedReview = await reviewService.deleteReviewById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted successfully',
    data: deletedReview,
  });
});

export const reviewController = {
  createReview,
  getReviewsByService,
  updateReviewById,
  getAllReviews,
  deleteReviewById,
};
