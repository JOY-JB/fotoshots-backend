import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { userFilterableFields } from '../user/user.interface';
import { clientService } from './client.service';

const getAllClients = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await clientService.getAllClient(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Clients fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

export const clientController = {
  getAllClients,
};
