"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_controller_1 = require("./booking.controller");
const booking_validation_1 = require("./booking.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(booking_validation_1.BookingValidation.BookingValidationSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.CLIENT), booking_controller_1.bookingController.createBooking);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), booking_controller_1.bookingController.getAllBookings);
router.get('/service/:serviceId', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.PHOTOGRAPHER), booking_controller_1.bookingController.getBookingsByService);
router.get('/user/:userId', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CLIENT), booking_controller_1.bookingController.getBookingsByUser);
router.get('/photographer/:userId', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.PHOTOGRAPHER), booking_controller_1.bookingController.getBookingsByPhotographer);
router.get('/:bookingId', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), booking_controller_1.bookingController.getBookingById);
router.patch('/cancel/:bookingId', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CLIENT), booking_controller_1.bookingController.cancelBookingById);
router.patch('/accept/:bookingId', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.PHOTOGRAPHER), booking_controller_1.bookingController.acceptBooking);
router.patch('/adjust/:bookingId', (0, validateRequest_1.default)(booking_validation_1.BookingValidation.adjustedBookingValidationSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.CLIENT), booking_controller_1.bookingController.adjustBooking);
router.patch('/reject/:bookingId', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.PHOTOGRAPHER), booking_controller_1.bookingController.rejectBooking);
router.patch('/complete/:bookingId', (0, auth_1.default)(user_1.ENUM_USER_ROLE.PHOTOGRAPHER), booking_controller_1.bookingController.completeBooking);
router.patch('/:bookingId', (0, validateRequest_1.default)(booking_validation_1.BookingValidation.updateBookingValidationSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.CLIENT, user_1.ENUM_USER_ROLE.ADMIN), booking_controller_1.bookingController.updateBookingById);
router.delete('/delete/:bookingId', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), booking_controller_1.bookingController.deleteBooking);
exports.bookingRoutes = router;
