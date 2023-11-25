import { User } from '@prisma/client';

import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { utils } from '../../../shared/utils';
import { IUpdateUserProfile, IUserResponse } from './user.interface';

const createClient = async (data: User) => {
  const isEmailExist = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (isEmailExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'This Email is Already Registered! Please choose another one'
    );
  }

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

  const accessToken = jwtHelpers.createToken(
    { userId: (await result).id, role: 'CLIENT' },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return { accessToken };
};

const createPhotographer = async (data: User) => {
  const isEmailExist = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (isEmailExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'This Email is Already Registered! Please choose another one'
    );
  }

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

  const accessToken = jwtHelpers.createToken(
    { userId: (await result).id, role: 'PHOTOGRAPHER' },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return { accessToken };
};

const createAdmin = async (data: User): Promise<IUserResponse> => {
  const isEmailExist = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (isEmailExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'This Email is Already Registered! Please choose another one'
    );
  }

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
