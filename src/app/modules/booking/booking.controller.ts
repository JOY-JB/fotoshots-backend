import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { bookingService } from './booking.service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as any;
  const payload = req.body;

  const result = await bookingService.createBooking({ ...payload, userId });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

export const bookingController = {
  createBooking,
};
