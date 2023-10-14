import { z } from 'zod';

const serviceCreateValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    price: z
      .number({
        required_error: 'Price is required',
      })
      .int()
      .min(1, 'Price must be at least 1'),
  }),
});

const serviceUpdateValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.number().int().min(1, 'Price must be at least 1').optional(),
  }),
});

export const serviceValidation = {
  serviceCreateValidationSchema,
  serviceUpdateValidationSchema,
};
