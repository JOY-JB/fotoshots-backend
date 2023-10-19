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
exports.reviewService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceExists = yield prisma_1.default.service.findUnique({
        where: { id: data.serviceId },
    });
    if (!serviceExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Service not found');
    }
    const hasBooking = yield prisma_1.default.booking.findFirst({
        where: {
            userId: data.userId,
            serviceId: data.serviceId,
            status: 'COMPLETED',
        },
    });
    if (!hasBooking) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "You can't leave a review for this service");
    }
    const result = prisma_1.default.review.create({
        data,
    });
    return result;
});
const getAllReviews = () => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield prisma_1.default.review.findMany({
        include: {
            user: true,
        },
    });
    return reviews;
});
const getReviewsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield prisma_1.default.review.findMany({
        where: {
            userId,
        },
        include: {
            user: true,
            service: true,
        },
    });
    return reviews;
});
const getReviewsByService = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield prisma_1.default.review.findMany({
        where: {
            serviceId: serviceId,
        },
        include: {
            user: true,
        },
    });
    return reviews;
});
const getReviewsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield prisma_1.default.review.findUnique({
        where: {
            id,
        },
        include: {
            user: true,
            service: true,
        },
    });
    return reviews;
});
const updateReviewById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewData = yield prisma_1.default.review.findUnique({
        where: {
            id,
        },
    });
    if (!reviewData) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Review not found for update.');
    }
    const result = yield prisma_1.default.review.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteReviewById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewData = yield prisma_1.default.review.findUnique({
        where: {
            id,
        },
    });
    if (!reviewData) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Review not found for deletion.');
    }
    const result = yield prisma_1.default.review.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.reviewService = {
    createReview,
    getReviewsByService,
    updateReviewById,
    deleteReviewById,
    getAllReviews,
    getReviewsByUser,
    getReviewsById,
};
