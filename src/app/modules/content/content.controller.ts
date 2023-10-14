import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { contentService } from './content.service';

const createBlogPost = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await contentService.createBlogPost(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog post created successfully',
    data: result,
  });
});

const updateBlogPostById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const updatedBlogPost = await contentService.updateBlogPostById(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog post updated successfully',
    data: updatedBlogPost,
  });
});

const deleteBlogPostById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedBlogPost = await contentService.deleteBlogPostById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog post deleted successfully',
    data: deletedBlogPost,
  });
});

const getAllBlogPosts = catchAsync(async (req: Request, res: Response) => {
  const blogPosts = await contentService.getAllBlogPosts();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog posts fetched successfully!',
    data: blogPosts,
  });
});

const createFAQ = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await contentService.createFAQ(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ created successfully',
    data: result,
  });
});

const updateFAQById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const updatedFAQ = await contentService.updateFAQById(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ updated successfully',
    data: updatedFAQ,
  });
});

const deleteFAQById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedFAQ = await contentService.deleteFAQById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ deleted successfully',
    data: deletedFAQ,
  });
});

const getAllFAQs = catchAsync(async (req: Request, res: Response) => {
  const faqs = await contentService.getAllFAQs();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQs fetched successfully!',
    data: faqs,
  });
});

export const contentController = {
  createBlogPost,
  updateBlogPostById,
  deleteBlogPostById,
  getAllBlogPosts,
  createFAQ,
  updateFAQById,
  deleteFAQById,
  getAllFAQs,
};
