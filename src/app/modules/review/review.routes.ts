import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { reviewController } from './review.controller';
import { ReviewValidation } from './review.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(ReviewValidation.ReviewValidationSchema),
  auth(ENUM_USER_ROLE.CLIENT),
  reviewController.createReview
);

router.get('/', reviewController.getAllReviews);

router.get('/service/:serviceId', reviewController.getReviewsByService);

router.get('/user/:userId', reviewController.getReviewsByUser);

router.get('/:id', reviewController.getReviewsById);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.CLIENT),
  reviewController.updateReviewById
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CLIENT),
  reviewController.deleteReviewById
);

export const reviewRoutes = router;
