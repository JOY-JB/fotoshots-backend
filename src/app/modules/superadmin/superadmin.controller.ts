import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { superAdminService } from './superadmin.service';

const createSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await superAdminService.createSuperAdmin(payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Super admin created successfully',
    data: result,
  });
});

const getSuperAdminById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await superAdminService.getSuperAdminById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Super admin fetched successfully',
    data: result,
  });
});

const updateSuperAdminById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await superAdminService.updateSuperAdminById(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Super admin updated successfully',
    data: result,
  });
});

export const superAdminController = {
  createSuperAdmin,
  getSuperAdminById,
  updateSuperAdminById,
};
