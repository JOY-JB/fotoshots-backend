import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { serviceFilterableFields } from './service.constant';
import { serviceServices } from './service.service';

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, serviceFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await serviceServices.getAllServices(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const createService = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as any;

  const result = await serviceServices.createService({ ...req.body, userId });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service created successfully!',
    data: result,
  });
});

const getServiceById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await serviceServices.getServiceById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service fetched successfully',
    data: result,
  });
});

const getServicesByUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const options = pick(req.query, paginationFields);

  const result = await serviceServices.getServicesByUser(userId, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services fetched by user successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateServiceById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await serviceServices.updateServiceById(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service updated successfully',
    data: result,
  });
});

const deleteServiceById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await serviceServices.deleteServiceById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service deleted successfully',
    data: result,
  });
});

export const serviceController = {
  getAllServices,
  getServiceById,
  getServicesByUser,
  createService,
  updateServiceById,
  deleteServiceById,
};
