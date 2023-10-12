import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { userFilterableFields } from '../user/user.interface';
import { photographerService } from './photographer.service';

const getAllPhotographers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await photographerService.getAllPhotographers(
    filters,
    options
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Photographer fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getPhotographerById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await photographerService.getPhotographerById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Photographer fetched successfully',
    data: result,
  });
});

const updatePhotographerById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;

    const result = await photographerService.updatePhotographerById(
      id,
      payload
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Photographer updated successfully',
      data: result,
    });
  }
);

const deletePhotographerById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await photographerService.deletePhotographerById(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Photographer deleted successfully',
      data: result,
    });
  }
);

export const photographerController = {
  getAllPhotographers,
  getPhotographerById,
  updatePhotographerById,
  deletePhotographerById,
};
