import { z } from 'zod';

const FeedbackValidationSchema = z.object({
  body: z.object({
    message: z.string({
      required_error: 'Message is required',
    }),
    serviceId: z.string({
      required_error: 'Service ID is required',
    }),
  }),
});

export const FeedbackValidation = {
  FeedbackValidationSchema,
};
