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
exports.bookingService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const booking_utils_1 = require("./booking.utils");
const createBooking = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield prisma_1.default.user.findUnique({
        where: { id: data.userId },
    });
    if (!userExists) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'User not found');
    }
    const serviceExists = yield prisma_1.default.service.findUnique({
        where: { id: data.serviceId },
    });
    if (!serviceExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Service not found');
    }
    const isAvailable = yield booking_utils_1.bookingUtils.checkAvailability(data.serviceId, data.date, data.startTime, data.endTime);
    if (!isAvailable) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Service is not available at the selected date and time');
    }
    const result = prisma_1.default.booking.create({
        data,
    });
    return result;
});
const getAllBookings = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const andConditions = [];
    if (Object.keys(filters).length > 0) {
        andConditions.push({
            AND: Object.keys(filters).map(key => {
                if (key === 'date') {
                    const frontEndDateString = filters[key];
                    const formattedDate = frontEndDateString.substring(0, 10);
                    return {
                        date: {
                            gte: formattedDate + 'T00:00:00Z',
                            lt: formattedDate + 'T23:59:59Z',
                        },
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filters[key],
                        },
                    };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.booking.findMany({
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        where: whereConditions,
        include: {
            user: true,
            service: true,
        },
    });
    const total = yield prisma_1.default.booking.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getBookingById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingData = yield prisma_1.default.booking.findUnique({
        where: {
            id,
        },
    });
    if (!bookingData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Booking not found!');
    }
    return bookingData;
});
const updateBookingById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingData = yield prisma_1.default.booking.findUnique({
        where: {
            id,
        },
    });
    if (!bookingData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Booking not Found!');
    }
    const result = yield prisma_1.default.booking.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const cancelBookingById = (userId, bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingData = yield prisma_1.default.booking.findUnique({
        where: {
            userId,
            id: bookingId,
        },
    });
    if (!bookingData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Booking not found');
    }
    if (bookingData.status !== 'PENDING' && bookingData.status !== 'ACCEPTED') {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Booking cannot be canceled in its current state');
    }
    const result = yield prisma_1.default.booking.update({
        where: {
            id: bookingId,
        },
        data: {
            status: 'CANCELED',
        },
    });
    return result;
});
const getBookingsByUser = (filters, options, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const andConditions = [];
    if (Object.keys(filters).length > 0) {
        andConditions.push({
            AND: Object.keys(filters).map(key => {
                if (key === 'date') {
                    const frontEndDateString = filters[key];
                    const formattedDate = frontEndDateString.substring(0, 10);
                    return {
                        date: {
                            gte: formattedDate + 'T00:00:00Z',
                            lt: formattedDate + 'T23:59:59Z',
                        },
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filters[key],
                        },
                    };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const bookings = yield prisma_1.default.booking.findMany({
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        where: Object.assign({ userId }, whereConditions),
        include: {
            service: true,
            user: true,
        },
    });
    const total = yield prisma_1.default.booking.count({
        where: Object.assign({ userId }, whereConditions),
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: bookings,
    };
});
const getBookingsByPhotographer = (filters, options, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const andConditions = [];
    if (Object.keys(filters).length > 0) {
        andConditions.push({
            AND: Object.keys(filters).map(key => {
                if (key === 'date') {
                    const frontEndDateString = filters[key];
                    const formattedDate = frontEndDateString.substring(0, 10);
                    return {
                        date: {
                            gte: formattedDate + 'T00:00:00Z',
                            lt: formattedDate + 'T23:59:59Z',
                        },
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filters[key],
                        },
                    };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const bookings = yield prisma_1.default.booking.findMany({
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        where: Object.assign({ service: {
                userId: id,
            } }, whereConditions),
        include: {
            user: true,
            service: true,
        },
    });
    const total = yield prisma_1.default.booking.count({
        where: Object.assign({ service: {
                userId: id,
            } }, whereConditions),
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: bookings,
    };
});
const getBookingsByService = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield prisma_1.default.booking.findMany({
        where: {
            serviceId,
        },
    });
    return bookings;
});
const acceptBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma_1.default.booking.findUnique({ where: { id: bookingId } });
    if (!booking) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Booking not found');
    }
    if (booking.status !== client_1.BookingStatus.PENDING &&
        booking.status !== client_1.BookingStatus.ADJUSTED) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Booking status is not pending or adjusted');
    }
    const acceptedBooking = yield prisma_1.default.booking.update({
        where: { id: bookingId },
        data: {
            status: client_1.BookingStatus.ACCEPTED,
        },
    });
    return acceptedBooking;
});
const adjustBooking = (userId, bookingId, updatedBookingData) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma_1.default.booking.findUnique({
        where: { id: bookingId, userId },
    });
    if (!booking) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Booking not found');
    }
    if (booking.status !== client_1.BookingStatus.PENDING) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Booking status is not pending');
    }
    const dataToUpdate = {};
    if (updatedBookingData.date) {
        dataToUpdate.date = updatedBookingData.date;
    }
    if (updatedBookingData.startTime) {
        dataToUpdate.startTime = updatedBookingData.startTime;
    }
    if (updatedBookingData.endTime) {
        dataToUpdate.endTime = updatedBookingData.endTime;
    }
    const adjustedBooking = yield prisma_1.default.booking.update({
        where: { id: bookingId },
        data: Object.assign(Object.assign({}, dataToUpdate), { status: client_1.BookingStatus.ADJUSTED }),
    });
    return adjustedBooking;
});
const rejectBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma_1.default.booking.findUnique({ where: { id: bookingId } });
    if (!booking) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Booking not found');
    }
    if (booking.status !== client_1.BookingStatus.PENDING) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Booking status is not pending');
    }
    const rejectedBooking = yield prisma_1.default.booking.update({
        where: { id: bookingId },
        data: {
            status: client_1.BookingStatus.REJECTED,
        },
    });
    return rejectedBooking;
});
const completeBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma_1.default.booking.findUnique({ where: { id: bookingId } });
    if (!booking) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Booking not found');
    }
    if (booking.status !== client_1.BookingStatus.ACCEPTED) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Booking status is not accepted');
    }
    const completedBooking = yield prisma_1.default.booking.update({
        where: { id: bookingId },
        data: {
            status: client_1.BookingStatus.COMPLETED,
        },
    });
    return completedBooking;
});
const deleteBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma_1.default.booking.findUnique({ where: { id: bookingId } });
    if (!booking) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Booking not found');
    }
    if (booking.status === client_1.BookingStatus.COMPLETED) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Cannot delete a completed booking');
    }
    const deletedBooking = yield prisma_1.default.booking.delete({
        where: { id: bookingId },
    });
    return deletedBooking;
});
exports.bookingService = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBookingById,
    getBookingsByPhotographer,
    cancelBookingById,
    getBookingsByUser,
    getBookingsByService,
    acceptBooking,
    adjustBooking,
    rejectBooking,
    completeBooking,
    deleteBooking,
};
