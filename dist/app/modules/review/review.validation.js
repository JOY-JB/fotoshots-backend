"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const ReviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        rating: zod_1.z
            .number({
            required_error: 'Rating is required',
        })
            .int()
            .min(1, 'Rating must be at least 1'),
        comment: zod_1.z.string().optional(),
        //   userId: z.string({
        //     required_error: 'User ID is required',
        //   }),
        serviceId: zod_1.z.string({
            required_error: 'Service ID is required',
        }),
    }),
});
exports.ReviewValidation = {
    ReviewValidationSchema,
};
