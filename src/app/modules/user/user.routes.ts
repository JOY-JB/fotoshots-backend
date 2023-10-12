import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-client',
  validateRequest(UserValidation.UserValidationSchema),
  userController.createClient
);
router.post(
  '/create-photographer',
  validateRequest(UserValidation.UserValidationSchema),
  userController.createPhotographer
);
router.post(
  '/create-admin',
  validateRequest(UserValidation.UserValidationSchema),
  userController.createAdmin
);

export const userRoutes = router;
