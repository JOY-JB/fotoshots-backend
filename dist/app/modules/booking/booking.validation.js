"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const BookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string({
            required_error: 'Date is required',
        }),
        startTime: zod_1.z.string({
            required_error: 'Start time is required',
        }),
        endTime: zod_1.z.string({
            required_error: 'End time is required',
        }),
        serviceId: zod_1.z.string({
            required_error: 'Service ID is required',
        }),
    }),
});
const updateBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string().optional(),
        startTime: zod_1.z.string().optional(),
        endTime: zod_1.z.string().optional(),
        serviceId: zod_1.z.string().optional(),
    }),
});
const adjustedBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string({
            required_error: 'Date is required',
        }),
        startTime: zod_1.z.string({
            required_error: 'Start time is required',
        }),
        endTime: zod_1.z.string({
            required_error: 'End time is required',
        }),
    }),
});
exports.BookingValidation = {
    BookingValidationSchema,
    updateBookingValidationSchema,
    adjustedBookingValidationSchema,
};
