import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { feedbackController } from './feedback.controller';
import { FeedbackValidation } from './feedback.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(FeedbackValidation.FeedbackValidationSchema),
  auth(ENUM_USER_ROLE.CLIENT),
  feedbackController.createFeedback
);

router.get('/service/:serviceId', feedbackController.getFeedbacksByService);

router.get('/:userId', feedbackController.getFeedbacksByService);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.CLIENT),
  feedbackController.updateFeedbackById
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CLIENT),
  feedbackController.deleteFeedbackById
);

export const feedbackRoutes = router;
