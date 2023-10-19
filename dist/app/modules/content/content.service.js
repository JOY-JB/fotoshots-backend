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
exports.contentService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createBlogPost = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.content.create({
        data: Object.assign(Object.assign({}, data), { type: 'BLOG' }),
    });
    return result;
});
const updateBlogPostById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const contentData = yield prisma_1.default.content.findUnique({
        where: {
            id,
            type: 'BLOG',
        },
    });
    if (!contentData) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Blog post not found for update.');
    }
    const result = yield prisma_1.default.content.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteBlogPostById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const contentData = yield prisma_1.default.content.findUnique({
        where: {
            id,
            type: 'BLOG',
        },
    });
    if (!contentData) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Blog post not found for deletion.');
    }
    const result = yield prisma_1.default.content.delete({
        where: {
            id,
        },
    });
    return result;
});
const getAllBlogPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const blogPosts = yield prisma_1.default.content.findMany({
        where: {
            type: 'BLOG',
        },
    });
    return blogPosts;
});
const createFAQ = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.content.create({
        data: Object.assign(Object.assign({}, data), { type: 'FAQ' }),
    });
    return result;
});
const updateFAQById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const contentData = yield prisma_1.default.content.findUnique({
        where: {
            id,
            type: 'FAQ',
        },
    });
    if (!contentData) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'FAQ not found for update.');
    }
    const result = yield prisma_1.default.content.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteFAQById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const contentData = yield prisma_1.default.content.findUnique({
        where: {
            id,
            type: 'FAQ',
        },
    });
    if (!contentData) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'FAQ not found for deletion.');
    }
    const result = yield prisma_1.default.content.delete({
        where: {
            id,
        },
    });
    return result;
});
const getAllFAQs = () => __awaiter(void 0, void 0, void 0, function* () {
    const faqs = yield prisma_1.default.content.findMany({
        where: {
            type: 'FAQ',
        },
    });
    return faqs;
});
const getContentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const contentData = yield prisma_1.default.content.findUnique({
        where: {
            id,
        },
    });
    if (!contentData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Content not found!');
    }
    return contentData;
});
exports.contentService = {
    createBlogPost,
    updateBlogPostById,
    deleteBlogPostById,
    getAllBlogPosts,
    createFAQ,
    updateFAQById,
    deleteFAQById,
    getAllFAQs,
    getContentById,
};
