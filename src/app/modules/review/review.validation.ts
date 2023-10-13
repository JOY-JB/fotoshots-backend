import { z } from 'zod';

const ReviewValidationSchema = z.object({
  body: z.object({
    rating: z
      .number({
        required_error: 'Rating is required',
      })
      .int()
      .min(1, 'Rating must be at least 1'),
    comment: z.string().optional(),
    //   userId: z.string({
    //     required_error: 'User ID is required',
    //   }),
    serviceId: z.string({
      required_error: 'Service ID is required',
    }),
  }),
});

export const ReviewValidation = {
  ReviewValidationSchema,
};
