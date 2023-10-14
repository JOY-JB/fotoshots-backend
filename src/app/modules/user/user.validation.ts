import { z } from 'zod';

const UserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Invalid email format',
      }),
    password: z.string({
      required_error: 'Password is required',
    }),
    contactNo: z.string({
      required_error: 'Contact number is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    profileImg: z.string().optional(),
    bio: z.string().optional(),
  }),
});

const UserUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z
      .string()
      .email({
        message: 'Invalid email format',
      })
      .optional(),
    password: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional(),
    bio: z.string().optional(),
  }),
});

const userProfileUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required' }).optional(),
    email: z.string().email({ message: 'Invalid email format' }).optional(),
    oldPassword: z
      .string()
      .min(6, { message: 'Old password is required' })
      .optional(),
    newPassword: z
      .string()
      .min(6, { message: 'New password is required' })
      .optional(),
    contactNo: z
      .string()
      .min(1, { message: 'Contact number is required' })
      .optional(),
    address: z.string().min(1, { message: 'Address is required' }).optional(),
    profileImg: z.string().optional(),
    bio: z.string().optional(),
  }),
});

export const UserValidation = {
  UserValidationSchema,
  UserUpdateValidationSchema,
  userProfileUpdateValidationSchema,
};
