import { UserRole } from '@prisma/client';

export type IUserResponse = {
  id?: string;
  name: string;
  email: string;
  role: UserRole;
  contactNo: string;
  address: string;
  profileImg?: string | null;
  accessToken?: string;
};

export type IUpdateUserProfile = {
  name?: string;
  email?: string;
  oldPassword?: string;
  newPassword?: string;
  contactNo?: string;
  address?: string;
  profileImg?: string;
  bio?: string;
};

export type IUserFilterRequest = {
  // searchTerm?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  contactNo?: string | undefined;
};

export const userSearchableFields: string[] = ['name', 'role', 'address'];

export const userFilterableFields: string[] = [
  // 'searchTerm',
  'name',
  'email',
  'contactNo',
];
