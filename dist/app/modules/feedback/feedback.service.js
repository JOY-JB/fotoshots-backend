"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createFeedback = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceExists = yield prisma_1.default.service.findUnique({
        where: { id: data.serviceId },
    });
    if (!serviceExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Service not found');
    }
    const hasCompletedBooking = yield prisma_1.default.booking.findFirst({
        where: {
            userId: data.userId,
            serviceId: data.serviceId,
            status: 'COMPLETED',
        },
    });
    if (!hasCompletedBooking) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "You can't leave feedback for this service until you've completed a booking.");
    }
    const result = prisma_1.default.feedback.create({
        data,
    });
    return result;
});
const getFeedbacksByService = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const feedback = yield prisma_1.default.feedback.findMany({
        where: {
            serviceId: serviceId,
        },
        include: {
            user: true,
        },
    });
    return feedback;
});
const getFeedbacksByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const feedback = yield prisma_1.default.feedback.findMany({
        where: {
            userId,
        },
        include: {
            user: true,
            service: true,
        },
    });
    return feedback;
});
const updateFeedbackById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const feedbackData = yield prisma_1.default.feedback.findUnique({
        where: {
            id,
        },
    });
    if (!feedbackData) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Feedback not found for update.');
    }
    const result = yield prisma_1.default.feedback.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteFeedbackById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const feedbackData = yield prisma_1.default.feedback.findUnique({
        where: {
            id,
        },
    });
    if (!feedbackData) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Feedback not found for deletion.');
    }
    const result = yield prisma_1.default.feedback.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.feedbackService = {
    createFeedback,
    getFeedbacksByService,
    updateFeedbackById,
    deleteFeedbackById,
    getFeedbacksByUser,
};
