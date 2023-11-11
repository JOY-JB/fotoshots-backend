import { Prisma, Service } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { serviceSearchableFields } from './service.constant';
import { IServiceFilterRequest } from './service.interaface';

const getAllServices = async (
  filters: IServiceFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Service[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: serviceSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (key === 'minPrice' || key === 'maxPrice') {
          const operator = key === 'minPrice' ? 'gte' : 'lte';
          return {
            price: {
              [operator]: parseInt((filterData as any)[key]),
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.service.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    where: whereConditions,
    include: {
      user: true,
    },
  });

  const total = await prisma.service.count({
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

const createService = async (data: Service): Promise<Service> => {
  const isExist = await prisma.service.findFirst({
    where: {
      title: data.title,
      description: data.description,
      price: data.price,
      userId: data.userId,
    },
  });

  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Service already exist!');
  }

  const createdService = await prisma.service.create({
    data,
    include: {
      user: true,
    },
  });

  return createdService;
};

const getServiceById = async (id: string): Promise<Service> => {
  const serviceData = await prisma.service.findUnique({
    where: {
      id,
    },
  });

  if (!serviceData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Service not Found!');
  }

  return serviceData;
};

const getServicesByUser = async (
  userId: string,
  options: IPaginationOptions
): Promise<IGenericResponse<Service[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const result = await prisma.service.findMany({
    skip,
    take: limit,
    where: {
      userId,
    },
    include: {
      bookings: true,
      reviews: true,
    },
  });

  const total = await prisma.service.count({
    where: {
      userId,
    },
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateServiceById = async (
  id: string,
  payload: Partial<Service>
): Promise<Service> => {
  const serviceData = await prisma.service.findUnique({
    where: {
      id,
    },
  });

  if (!serviceData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Service not Found!');
  }

  const result = await prisma.service.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteServiceById = async (id: string): Promise<Service> => {
  const serviceData = await prisma.service.findUnique({
    where: {
      id,
    },
  });

  const isBookingExist = await prisma.booking.findFirst({
    where: {
      serviceId: id,
    },
  });

  if (!serviceData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Service not Found!');
  }

  if (isBookingExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Unable to delete service, Service has active bookings!'
    );
  }

  const result = await prisma.service.delete({
    where: {
      id,
    },
  });
  return result;
};

export const serviceServices = {
  getAllServices,
  createService,
  getServiceById,
  updateServiceById,
  getServicesByUser,
  deleteServiceById,
};
