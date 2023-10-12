import { User } from '@prisma/client';

import prisma from '../../../shared/prisma';
import { utils } from '../../../shared/utils';
import { IUserResponse } from './user.interface';

const createClient = async (data: User): Promise<IUserResponse> => {
  data.role = 'CLIENT';
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

const createPhotographer = async (data: User): Promise<IUserResponse> => {
  data.role = 'PHOTOGRAPHER';
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

const createAdmin = async (data: User): Promise<IUserResponse> => {
  data.role = 'ADMIN';
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

export const userService = {
  createClient,
  createPhotographer,
  createAdmin,
};
