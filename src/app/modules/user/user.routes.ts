import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
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
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  userController.createAdmin
);

router.patch(
  '/profile',
  validateRequest(UserValidation.userProfileUpdateValidationSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.PHOTOGRAPHER,
    ENUM_USER_ROLE.CLIENT
  ),
  userController.updateProfile
);

export const userRoutes = router;
