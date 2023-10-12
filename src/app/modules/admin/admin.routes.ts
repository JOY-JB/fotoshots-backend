import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { adminController } from './admin.controller';
const router = express.Router();

router.get('/', adminController.getAllAdmins);

router.get('/:id', adminController.getAdminById);

router.patch(
  '/:id',
  validateRequest(UserValidation.UserUpdateValidationSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  adminController.updateAdminById
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  adminController.deleteAdminById
);

export const adminRoutes = router;
