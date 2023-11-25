import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { utils } from '../../../shared/utils';
import { IUserResponse } from '../user/user.interface';

const createSuperAdmin = async (data: User): Promise<IUserResponse> => {
  data.role = 'SUPER_ADMIN';
  data.password = await utils.hashedPassword(data.password);

  const result = prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });

  return result;
};

const getSuperAdminById = async (id: string): Promise<User> => {
  const superAdminData = await prisma.user.findUnique({
    where: {
      id,
      role: 'SUPER_ADMIN',
    },
  });

  if (!superAdminData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Super Admin does not exist!');
  }

  return superAdminData;
};

const updateSuperAdminById = async (
  id: string,
  payload: Partial<User>
): Promise<User> => {
  const superAdminData = await prisma.user.findUnique({
    where: {
      id,
      role: 'SUPER_ADMIN',
    },
  });

  if (!superAdminData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Super Admin does not exist!');
  }

  const isEmailExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (isEmailExist && isEmailExist.email !== superAdminData.email) {
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

export const superAdminService = {
  createSuperAdmin,
  getSuperAdminById,
  updateSuperAdminById,
};
