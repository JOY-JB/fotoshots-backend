import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { photographerController } from './photographer.controller';
const router = express.Router();

router.get('/', photographerController.getAllPhotographers);

router.get('/:id', photographerController.getPhotographerById);

router.patch(
  '/:id',
  validateRequest(UserValidation.UserUpdateValidationSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.PHOTOGRAPHER
  ),
  photographerController.updatePhotographerById
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  photographerController.deletePhotographerById
);

export const photographerRoutes = router;
