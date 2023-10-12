import { Prisma, User } from '@prisma/client';
// import httpStatus from 'http-status';
// import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IUserFilterRequest } from '../user/user.interface';

const getAllClient = async (
  filters: IUserFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<User[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const andConditions = [];

  if (Object.keys(filters).length > 0) {
    andConditions.push({
      AND: Object.keys(filters).map(key => ({
        [key]: {
          equals: (filters as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    where: whereConditions,
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getClientById = async (id: string): Promise<User> => {
  const clientData = await prisma.user.findUnique({
    where: {
      id,
      role: 'CLIENT',
    },
  });

  if (!clientData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Client does not exist!');
  }

  return clientData;
};

const updateClientById = async (
  id: string,
  payload: Partial<User>
): Promise<User> => {
  const clientData = await prisma.user.findUnique({
    where: {
      id,
      role: 'CLIENT',
    },
  });

  if (!clientData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Client does not exist!');
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteClientById = async (id: string): Promise<User> => {
  const clientData = await prisma.user.findUnique({
    where: {
      id,
      role: 'CLIENT',
    },
  });

  if (!clientData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Client does not exist!');
  }

  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const clientService = {
  getAllClient,
  getClientById,
  updateClientById,
  deleteClientById,
};
