import { UserRole } from '@prisma/client';

export type IUserResponse = {
  id?: string;
  name: string;
  email: string;
  role: UserRole;
  contactNo: string;
  address: string;
  profileImg?: string | null;
};
