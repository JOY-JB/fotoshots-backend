import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { feedbackService } from './feedback.service';

const createFeedback = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as any;
  const payload = req.body;

  const result = await feedbackService.createFeedback({ ...payload, userId });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback submitted successfully',
    data: result,
  });
});

const getFeedbacksByService = catchAsync(
  async (req: Request, res: Response) => {
    const { serviceId } = req.params;

    const feedbacks = await feedbackService.getFeedbacksByService(serviceId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedbacks fetched successfully!',
      data: feedbacks,
    });
  }
);

const updateFeedbackById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const updatedFeedback = await feedbackService.updateFeedbackById(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback updated successfully',
    data: updatedFeedback,
  });
});

const deleteFeedbackById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedFeedback = await feedbackService.deleteFeedbackById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback deleted successfully',
    data: deletedFeedback,
  });
});

export const feedbackController = {
  createFeedback,
  getFeedbacksByService,
  updateFeedbackById,
  deleteFeedbackById,
};
