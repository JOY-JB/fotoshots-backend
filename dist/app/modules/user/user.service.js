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
exports.userService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const utils_1 = require("../../../shared/utils");
const createClient = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isEmailExist = yield prisma_1.default.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (isEmailExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'This Email is Already Registered! Please choose another one');
    }
    data.role = 'CLIENT';
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
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId: (yield result).id, role: 'CLIENT' }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return { accessToken };
});
const createPhotographer = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isEmailExist = yield prisma_1.default.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (isEmailExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'This Email is Already Registered! Please choose another one');
    }
    data.role = 'PHOTOGRAPHER';
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
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId: (yield result).id, role: 'PHOTOGRAPHER' }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return { accessToken };
});
const createAdmin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isEmailExist = yield prisma_1.default.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (isEmailExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'This Email is Already Registered! Please choose another one');
    }
    data.role = 'ADMIN';
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
const updateProfile = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!userData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User not Found!');
    }
    const isEmailExist = yield prisma_1.default.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (isEmailExist && isEmailExist.email !== userData.email) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'This Email is Already Registered! Please choose another one');
    }
    if (payload.oldPassword) {
        const isPasswordMatch = yield utils_1.utils.isPasswordMatched(payload.oldPassword, userData.password);
        if (!isPasswordMatch) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
        }
    }
    const dataToUpdate = {};
    if (payload.name) {
        dataToUpdate.name = payload.name;
    }
    if (payload.email) {
        dataToUpdate.email = payload.email;
    }
    if (payload.contactNo) {
        dataToUpdate.contactNo = payload.contactNo;
    }
    if (payload.address) {
        dataToUpdate.address = payload.address;
    }
    if (payload.profileImg) {
        dataToUpdate.profileImg = payload.profileImg;
    }
    if (payload.bio) {
        dataToUpdate.bio = payload.bio;
    }
    if (payload.newPassword && payload.oldPassword) {
        dataToUpdate.password = payload.newPassword;
    }
    const result = prisma_1.default.user.update({
        where: {
            id: userId,
        },
        data: dataToUpdate,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
            bio: true,
        },
    });
    return result;
});
exports.userService = {
    createClient,
    createPhotographer,
    createAdmin,
    updateProfile,
};
