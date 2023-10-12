import express from 'express';
import { clientController } from './client.controller';
const router = express.Router();

router.get('/', clientController.getAllClients);

export const clientRoutes = router;
