import { z } from 'zod';

const BookingValidationSchema = z.object({
  body: z.object({
    date: z.string({
      required_error: 'Date is required',
    }),
    startTime: z.string({
      required_error: 'Start time is required',
    }),
    endTime: z.string({
      required_error: 'End time is required',
    }),
    serviceId: z.string({
      required_error: 'Service ID is required',
    }),
  }),
});

export const BookingValidation = {
  BookingValidationSchema,
};
