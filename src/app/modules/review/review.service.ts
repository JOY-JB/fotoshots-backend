import { Review } from '@prisma/client';
import prisma from '../../../shared/prisma';

// const getAllreviews = async (
//   filters: IUserFilterRequest,
//   options: IPaginationOptions
// ): Promise<IGenericResponse<User[]>> => {
//   const { page, limit, skip, sortBy, sortOrder } =
//     paginationHelpers.calculatePagination(options);

//   const andConditions = [];

//   if (Object.keys(filters).length > 0) {
//     andConditions.push({
//       AND: Object.keys(filters).map(key => ({
//         [key]: {
//           equals: (filters as any)[key],
//         },
//       })),
//     });
//   }

//   const whereConditions: Prisma.UserWhereInput =
//     andConditions.length > 0 ? { AND: andConditions } : {};

//   const result = await prisma.user.findMany({
//     skip,
//     take: limit,
//     orderBy: {
//       [sortBy]: sortOrder,
//     },
//     where: { ...whereConditions, role: 'review' },
//   });

//   const total = await prisma.user.count({
//     where: { ...whereConditions, role: 'review' },
//   });

//   return {
//     meta: {
//       total,
//       page,
//       limit,
//     },
//     data: result,
//   };
// };

// const getreviewById = async (id: string): Promise<User> => {
//   const reviewData = await prisma.user.findUnique({
//     where: {
//       id,
//       role: 'review',
//     },
//   });

//   if (!reviewData) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'review does not exist!');
//   }

//   return reviewData;
// };

// const updatereviewById = async (
//   id: string,
//   payload: Partial<User>
// ): Promise<User> => {
//   const reviewData = await prisma.user.findUnique({
//     where: {
//       id,
//       role: 'review',
//     },
//   });

//   if (!reviewData) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'review does not exist!');
//   }

//   const result = await prisma.user.update({
//     where: {
//       id,
//     },
//     data: payload,
//   });
//   return result;
// };

// const deletereviewById = async (id: string): Promise<User> => {
//   const reviewData = await prisma.user.findUnique({
//     where: {
//       id,
//       role: 'review',
//     },
//   });

//   if (!reviewData) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'review does not exist!');
//   }

//   const result = await prisma.user.delete({
//     where: {
//       id,
//     },
//   });
//   return result;
// };

const createReview = async (data: Review): Promise<Review> => {
  const result = prisma.review.create({
    data,
  });

  return result;
};

export const reviewService = {
  createReview,
};
