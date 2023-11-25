import { Prisma, User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IUserFilterRequest } from '../user/user.interface';

const getAllPhotographers = async (
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
    where: { ...whereConditions, role: 'PHOTOGRAPHER' },
  });

  const total = await prisma.user.count({
    where: { ...whereConditions, role: 'PHOTOGRAPHER' },
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

const getPhotographerById = async (id: string): Promise<User> => {
  const photographerData = await prisma.user.findUnique({
    where: {
      id,
      role: 'PHOTOGRAPHER',
    },
  });

  if (!photographerData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Photographer does not exist!');
  }

  return photographerData;
};

const updatePhotographerById = async (
  id: string,
  payload: Partial<User>
): Promise<User> => {
  const photographerData = await prisma.user.findUnique({
    where: {
      id,
      role: 'PHOTOGRAPHER',
    },
  });

  if (!photographerData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Photographer does not exist!');
  }

  const isEmailExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (isEmailExist && isEmailExist.email !== photographerData.email) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'This Email is Already Registered! Please choose another one'
    );
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deletePhotographerById = async (id: string): Promise<User> => {
  const photographerData = await prisma.user.findUnique({
    where: {
      id,
      role: 'PHOTOGRAPHER',
    },
  });

  if (!photographerData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Photographer does not exist!');
  }

  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const photographerService = {
  getAllPhotographers,
  getPhotographerById,
  updatePhotographerById,
  deletePhotographerById,
};
