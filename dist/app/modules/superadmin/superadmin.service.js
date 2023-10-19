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
exports.superAdminService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const utils_1 = require("../../../shared/utils");
const createSuperAdmin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    data.role = 'SUPER_ADMIN';
    data.password = yield utils_1.utils.hashedPassword(data.password);
    const result = prisma_1.default.user.create({
        data,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
        },
    });
    return result;
});
const getSuperAdminById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const superAdminData = yield prisma_1.default.user.findUnique({
        where: {
            id,
            role: 'SUPER_ADMIN',
        },
    });
    if (!superAdminData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Super Admin does not exist!');
    }
    return superAdminData;
});
const updateSuperAdminById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const superAdminData = yield prisma_1.default.user.findUnique({
        where: {
            id,
            role: 'SUPER_ADMIN',
        },
    });
    if (!superAdminData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Super Admin does not exist!');
    }
    const result = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
exports.superAdminService = {
    createSuperAdmin,
    getSuperAdminById,
    updateSuperAdminById,
};
