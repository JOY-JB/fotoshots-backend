import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { adminController } from './admin.controller';
const router = express.Router();

router.get('/', adminController.getAllAdmins);

router.get('/:id', adminController.getAdminById);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  adminController.updateAdminById
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  adminController.deleteAdminById
);

export const adminRoutes = router;