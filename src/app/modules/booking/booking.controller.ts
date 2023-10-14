import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookingFilterableFields } from './booking.interface';
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

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookingFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await bookingService.getAllBookings(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getBookingById = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;

  const result = await bookingService.getBookingById(bookingId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking fetched successfully',
    data: result,
  });
});

const updateBookingById = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const payload = req.body;

  const result = await bookingService.updateBookingById(bookingId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully',
    data: result,
  });
});

const cancelBookingById = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const { userId } = req.user as any;

  const result = await bookingService.cancelBookingById(userId, bookingId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking canceled successfully',
    data: result,
  });
});

const getBookingsByUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const result = await bookingService.getBookingsByUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Booking fetched successfully',
    data: result,
  });
});

const getBookingsByService = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params;

  const result = await bookingService.getBookingsByService(serviceId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings for the service fetched successfully',
    data: result,
  });
});

const acceptBooking = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;

  const result = await bookingService.acceptBooking(bookingId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking has been accepted',
    data: result,
  });
});

const adjustBooking = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const { userId } = req.user as any;
  const updatedBookingData = req.body;

  const result = await bookingService.adjustBooking(
    userId,
    bookingId,
    updatedBookingData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking has been adjusted',
    data: result,
  });
});

const rejectBooking = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;

  const result = await bookingService.rejectBooking(bookingId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking has been rejected',
    data: result,
  });
});

const completeBooking = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;

  const result = await bookingService.completeBooking(bookingId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking has been completed',
    data: result,
  });
});

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;

  const result = await bookingService.deleteBooking(bookingId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking has been deleted',
    data: result,
  });
});

export const bookingController = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingById,
  cancelBookingById,
  getBookingsByUser,
  getBookingsByService,
  acceptBooking,
  adjustBooking,
  rejectBooking,
  completeBooking,
  deleteBooking,
};
