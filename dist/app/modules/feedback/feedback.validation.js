"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackValidation = void 0;
const zod_1 = require("zod");
const FeedbackValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        message: zod_1.z.string({
            required_error: 'Message is required',
        }),
        serviceId: zod_1.z.string({
            required_error: 'Service ID is required',
        }),
    }),
});
exports.FeedbackValidation = {
    FeedbackValidationSchema,
};
