import { Content } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createBlogPost = async (data: Content): Promise<Content> => {
  const result = prisma.content.create({
    data: {
      ...data,
      type: 'BLOG',
    },
  });
  return result;
};

const updateBlogPostById = async (
  id: string,
  payload: Partial<Content>
): Promise<Content> => {
  const contentData = await prisma.content.findUnique({
    where: {
      id,
      type: 'BLOG',
    },
  });

  if (!contentData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog post not found for update.');
  }

  const result = await prisma.content.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteBlogPostById = async (id: string): Promise<Content> => {
  const contentData = await prisma.content.findUnique({
    where: {
      id,
      type: 'BLOG',
    },
  });

  if (!contentData) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Blog post not found for deletion.'
    );
  }

  const result = await prisma.content.delete({
    where: {
      id,
    },
  });
  return result;
};

const getAllBlogPosts = async (): Promise<Content[]> => {
  const blogPosts = await prisma.content.findMany({
    where: {
      type: 'BLOG',
    },
  });
  return blogPosts;
};

const createFAQ = async (data: Content): Promise<Content> => {
  const result = prisma.content.create({
    data: {
      ...data,
      type: 'FAQ',
    },
  });
  return result;
};

const updateFAQById = async (
  id: string,
  payload: Partial<Content>
): Promise<Content> => {
  const contentData = await prisma.content.findUnique({
    where: {
      id,
      type: 'FAQ',
    },
  });

  if (!contentData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'FAQ not found for update.');
  }

  const result = await prisma.content.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteFAQById = async (id: string): Promise<Content> => {
  const contentData = await prisma.content.findUnique({
    where: {
      id,
      type: 'FAQ',
    },
  });

  if (!contentData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'FAQ not found for deletion.');
  }

  const result = await prisma.content.delete({
    where: {
      id,
    },
  });
  return result;
};

const getAllFAQs = async (): Promise<Content[]> => {
  const faqs = await prisma.content.findMany({
    where: {
      type: 'FAQ',
    },
  });
  return faqs;
};

const getContentById = async (id: string): Promise<Content> => {
  const contentData = await prisma.content.findUnique({
    where: {
      id,
    },
  });

  if (!contentData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Content not found!');
  }

  return contentData;
};

export const contentService = {
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
