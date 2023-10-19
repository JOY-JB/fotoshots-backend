"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const UserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email({
            message: 'Invalid email format',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        contactNo: zod_1.z.string({
            required_error: 'Contact number is required',
        }),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
        profileImg: zod_1.z.string().optional(),
        bio: zod_1.z.string().optional(),
    }),
});
const UserUpdateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z
            .string()
            .email({
            message: 'Invalid email format',
        })
            .optional(),
        password: zod_1.z.string().optional(),
        contactNo: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        profileImg: zod_1.z.string().optional(),
        bio: zod_1.z.string().optional(),
    }),
});
const userProfileUpdateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: 'Name is required' }).optional(),
        email: zod_1.z.string().email({ message: 'Invalid email format' }).optional(),
        oldPassword: zod_1.z
            .string()
            .min(6, { message: 'Old password is required' })
            .optional(),
        newPassword: zod_1.z
            .string()
            .min(6, { message: 'New password is required' })
            .optional(),
        contactNo: zod_1.z
            .string()
            .min(1, { message: 'Contact number is required' })
            .optional(),
        address: zod_1.z.string().min(1, { message: 'Address is required' }).optional(),
        profileImg: zod_1.z.string().optional(),
        bio: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = {
    UserValidationSchema,
    UserUpdateValidationSchema,
    userProfileUpdateValidationSchema,
};
