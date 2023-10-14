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

const updateBookingValidationSchema = z.object({
  body: z.object({
    date: z.string().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    serviceId: z.string().optional(),
  }),
});

const adjustedBookingValidationSchema = z.object({
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
  }),
});

export const BookingValidation = {
  BookingValidationSchema,
  updateBookingValidationSchema,
  adjustedBookingValidationSchema,
};
