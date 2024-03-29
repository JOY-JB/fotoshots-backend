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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const service_constant_1 = require("./service.constant");
const getAllServices = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: service_constant_1.serviceSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                if (key === 'minPrice' || key === 'maxPrice') {
                    const operator = key === 'minPrice' ? 'gte' : 'lte';
                    return {
                        price: {
                            [operator]: parseInt(filterData[key]),
                        },
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filterData[key],
                        },
                    };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.service.findMany({
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        where: whereConditions,
        include: {
            user: true,
        },
    });
    const total = yield prisma_1.default.service.count({
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
const createService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.service.findFirst({
        where: {
            title: data.title,
            description: data.description,
            price: data.price,
            userId: data.userId,
        },
    });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Service already exist!');
    }
    const createdService = yield prisma_1.default.service.create({
        data,
        include: {
            user: true,
        },
    });
    return createdService;
});
const getServiceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceData = yield prisma_1.default.service.findUnique({
        where: {
            id,
        },
    });
    if (!serviceData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Service not Found!');
    }
    return serviceData;
});
const getServicesByUser = (userId, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.default.service.findMany({
        skip,
        take: limit,
        where: {
            userId,
        },
        include: {
            bookings: true,
            reviews: true,
        },
    });
    const total = yield prisma_1.default.service.count({
        where: {
            userId,
        },
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updateServiceById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceData = yield prisma_1.default.service.findUnique({
        where: {
            id,
        },
    });
    if (!serviceData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Service not Found!');
    }
    const result = yield prisma_1.default.service.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteServiceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceData = yield prisma_1.default.service.findUnique({
        where: {
            id,
        },
    });
    const isBookingExist = yield prisma_1.default.booking.findFirst({
        where: {
            serviceId: id,
        },
    });
    if (!serviceData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Service not Found!');
    }
    if (isBookingExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to delete service, Service has active bookings!');
    }
    const result = yield prisma_1.default.service.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.serviceServices = {
    getAllServices,
    createService,
    getServiceById,
    updateServiceById,
    getServicesByUser,
    deleteServiceById,
};
