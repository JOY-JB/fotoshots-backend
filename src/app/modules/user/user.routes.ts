import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/create-client', userController.createClient);
router.post('/create-photographer', userController.createClient);
router.post('/create-admin', userController.createClient);

export const userRoutes = router;
