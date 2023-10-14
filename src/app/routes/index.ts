import express from 'express';
import { adminRoutes } from '../modules/admin/admin.routes';
import { authRoutes } from '../modules/auth/auth.route';
import { bookingRoutes } from '../modules/booking/booking.routes';
import { clientRoutes } from '../modules/client/client.routes';
import { contentRoutes } from '../modules/content/content.routes';
import { feedbackRoutes } from '../modules/feedback/feedback.routes';
import { photographerRoutes } from '../modules/photographer/photographer.routes';
import { reviewRoutes } from '../modules/review/review.routes';
import { serviceRoutes } from '../modules/service/service.routes';
import { userRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/contents',
    routes: contentRoutes,
  },
  {
    path: '/feedbacks',
    routes: feedbackRoutes,
  },
  {
    path: '/bookings',
    routes: bookingRoutes,
  },
  {
    path: '/services',
    routes: serviceRoutes,
  },
  {
    path: '/reviews',
    routes: reviewRoutes,
  },
  {
    path: '/admins',
    routes: adminRoutes,
  },
  {
    path: '/photographers',
    routes: photographerRoutes,
  },
  {
    path: '/clients',
    routes: clientRoutes,
  },
  {
    path: '/users',
    routes: userRoutes,
  },
  {
    path: '/auth',
    routes: authRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
