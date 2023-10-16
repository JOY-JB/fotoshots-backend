import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { superAdminController } from './superadmin.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(UserValidation.UserValidationSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  superAdminController.createSuperAdmin
);

router.get('/:id', superAdminController.getSuperAdminById);

router.patch(
  '/:id',
  validateRequest(UserValidation.UserUpdateValidationSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  superAdminController.updateSuperAdminById
);

export const superAdminRoutes = router;
