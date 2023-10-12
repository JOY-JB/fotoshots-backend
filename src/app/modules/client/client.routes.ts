import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { clientController } from './client.controller';
const router = express.Router();

router.get('/', clientController.getAllClients);

router.get('/:id', clientController.getClientById);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CLIENT),
  clientController.updateClientById
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  clientController.deleteClientById
);

export const clientRoutes = router;
