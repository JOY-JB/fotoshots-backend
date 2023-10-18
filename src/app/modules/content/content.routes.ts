import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { contentController } from './content.controller';
import { ContentValidation } from './content.validation';

const router = express.Router();

router.post(
  '/blog',
  validateRequest(ContentValidation.ContentValidationSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  contentController.createBlogPost
);

router.patch(
  '/blog/:id',
  validateRequest(ContentValidation.ContentValidationSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  contentController.updateBlogPostById
);

router.delete(
  '/blog/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  contentController.deleteBlogPostById
);

router.get('/blog', contentController.getAllBlogPosts);

router.post(
  '/faq',
  validateRequest(ContentValidation.ContentValidationSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  contentController.createFAQ
);

router.patch(
  '/faq/:id',
  validateRequest(ContentValidation.ContentValidationSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  contentController.updateFAQById
);

router.delete(
  '/faq/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  contentController.deleteFAQById
);

router.get('/faq', contentController.getAllFAQs);

router.get('/:id', contentController.getContentById);

export const contentRoutes = router;
