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

export const UserValidation = {
  UserValidationSchema,
  UserUpdateValidationSchema,
};
