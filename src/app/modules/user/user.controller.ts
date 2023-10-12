import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { userService } from './user.service';

const createClient = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createClient(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully.',
    data: result,
  });
});

const createPhotographer = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createPhotographer(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Photographer created successfully.',
    data: result,
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createAdmin(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin created successfully.',
    data: result,
  });
});

export const userController = {
  createClient,
  createPhotographer,
  createAdmin,
};
