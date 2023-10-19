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
exports.adminService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getAllAdmins = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const andConditions = [];
    if (Object.keys(filters).length > 0) {
        andConditions.push({
            AND: Object.keys(filters).map(key => ({
                [key]: {
                    equals: filters[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.user.findMany({
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        where: Object.assign(Object.assign({}, whereConditions), { role: 'ADMIN' }),
    });
    const total = yield prisma_1.default.user.count({
        where: Object.assign(Object.assign({}, whereConditions), { role: 'ADMIN' }),
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
const getAdminById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const AdminData = yield prisma_1.default.user.findUnique({
        where: {
            id,
            role: 'ADMIN',
        },
    });
    if (!AdminData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Admin does not exist!');
    }
    return AdminData;
});
const updateAdminById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const AdminData = yield prisma_1.default.user.findUnique({
        where: {
            id,
            role: 'ADMIN',
        },
    });
    if (!AdminData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Admin does not exist!');
    }
    const result = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteAdminById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const AdminData = yield prisma_1.default.user.findUnique({
        where: {
            id,
            role: 'ADMIN',
        },
    });
    if (!AdminData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Admin does not exist!');
    }
    const result = yield prisma_1.default.user.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.adminService = {
    getAllAdmins,
    getAdminById,
    updateAdminById,
    deleteAdminById,
};
