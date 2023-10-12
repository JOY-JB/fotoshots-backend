import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { userFilterableFields } from '../user/user.interface';
import { adminService } from './admin.service';

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await adminService.getAllAdmins(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'admin fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getAdminById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await adminService.getAdminById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'admin fetched successfully',
    data: result,
  });
});

const updateAdminById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await adminService.updateAdminById(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'admin updated successfully',
    data: result,
  });
});

const deleteAdminById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await adminService.deleteAdminById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'admin deleted successfully',
    data: result,
  });
});

export const adminController = {
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};
