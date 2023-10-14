import { User } from '@prisma/client';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { utils } from '../../../shared/utils';
import { IUpdateUserProfile, IUserResponse } from './user.interface';

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

const updateProfile = async (
  userId: string,
  payload: Partial<IUpdateUserProfile>
): Promise<IUserResponse> => {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not Found!');
  }

  if (payload.oldPassword) {
    const isPasswordMatch = await utils.isPasswordMatched(
      payload.oldPassword,
      userData.password
    );

    if (!isPasswordMatch) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
    }
  }

  const dataToUpdate: Record<string, any> = {};

  if (payload.name) {
    dataToUpdate.name = payload.name;
  }
  if (payload.email) {
    dataToUpdate.email = payload.email;
  }
  if (payload.contactNo) {
    dataToUpdate.contactNo = payload.contactNo;
  }
  if (payload.address) {
    dataToUpdate.address = payload.address;
  }
  if (payload.profileImg) {
    dataToUpdate.profileImg = payload.profileImg;
  }
  if (payload.bio) {
    dataToUpdate.bio = payload.bio;
  }
  if (payload.newPassword && payload.oldPassword) {
    dataToUpdate.password = payload.newPassword;
  }

  const result = prisma.user.update({
    where: {
      id: userId,
    },
    data: dataToUpdate,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      bio: true,
    },
  });
  return result;
};

export const userService = {
  createClient,
  createPhotographer,
  createAdmin,
  updateProfile,
};
