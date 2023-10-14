import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { serviceController } from './service.controller';
import { serviceValidation } from './service.validation';
const router = express.Router();

router.get('/', serviceController.getAllServices);

router.get('/:id', serviceController.getServiceById);

router.get('/user/:userId', serviceController.getServicesByUser);

router.post(
  '/',
  validateRequest(serviceValidation.serviceCreateValidationSchema),
  auth(ENUM_USER_ROLE.PHOTOGRAPHER),
  serviceController.createService
);

router.patch(
  '/:id',
  validateRequest(serviceValidation.serviceUpdateValidationSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.PHOTOGRAPHER
  ),
  serviceController.updateServiceById
);

router.delete(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.PHOTOGRAPHER
  ),
  serviceController.deleteServiceById
);

export const serviceRoutes = router;
