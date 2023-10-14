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

export const reviewRoutes = router;
