import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { bookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(BookingValidation.BookingValidationSchema),
  auth(ENUM_USER_ROLE.CLIENT),
  bookingController.createBooking
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  bookingController.getAllBookings
);

router.get(
  '/service/:serviceId',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.PHOTOGRAPHER
  ),
  bookingController.getBookingsByService
);

router.get(
  '/user/:userId',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CLIENT),
  bookingController.getBookingsByUser
);

router.get(
  '/photographer/:userId',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.PHOTOGRAPHER
  ),
  bookingController.getBookingsByPhotographer
);

router.get(
  '/:bookingId',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  bookingController.getBookingById
);

router.patch(
  '/cancel/:bookingId',
  auth(ENUM_USER_ROLE.ADMIN),
  bookingController.cancelBookingById
);

router.patch(
  '/accept/:bookingId',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.PHOTOGRAPHER),
  bookingController.acceptBooking
);

router.patch(
  '/adjust/:bookingId',
  validateRequest(BookingValidation.adjustedBookingValidationSchema),
  auth(ENUM_USER_ROLE.CLIENT),
  bookingController.adjustBooking
);

router.patch(
  '/reject/:bookingId',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.PHOTOGRAPHER
  ),
  bookingController.rejectBooking
);

router.patch(
  '/complete/:bookingId',
  auth(ENUM_USER_ROLE.PHOTOGRAPHER),
  bookingController.completeBooking
);

router.patch(
  '/:bookingId',
  validateRequest(BookingValidation.updateBookingValidationSchema),
  auth(ENUM_USER_ROLE.CLIENT, ENUM_USER_ROLE.ADMIN),
  bookingController.updateBookingById
);

router.delete(
  '/delete/:bookingId',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  bookingController.deleteBooking
);

export const bookingRoutes = router;
