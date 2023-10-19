"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_routes_1 = require("../modules/admin/admin.routes");
const auth_route_1 = require("../modules/auth/auth.route");
const booking_routes_1 = require("../modules/booking/booking.routes");
const client_routes_1 = require("../modules/client/client.routes");
const content_routes_1 = require("../modules/content/content.routes");
const feedback_routes_1 = require("../modules/feedback/feedback.routes");
const photographer_routes_1 = require("../modules/photographer/photographer.routes");
const review_routes_1 = require("../modules/review/review.routes");
const service_routes_1 = require("../modules/service/service.routes");
const superadmin_routes_1 = require("../modules/superadmin/superadmin.routes");
const user_routes_1 = require("../modules/user/user.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/contents',
        routes: content_routes_1.contentRoutes,
    },
    {
        path: '/feedbacks',
        routes: feedback_routes_1.feedbackRoutes,
    },
    {
        path: '/bookings',
        routes: booking_routes_1.bookingRoutes,
    },
    {
        path: '/services',
        routes: service_routes_1.serviceRoutes,
    },
    {
        path: '/reviews',
        routes: review_routes_1.reviewRoutes,
    },
    {
        path: '/superadmins',
        routes: superadmin_routes_1.superAdminRoutes,
    },
    {
        path: '/admins',
        routes: admin_routes_1.adminRoutes,
    },
    {
        path: '/photographers',
        routes: photographer_routes_1.photographerRoutes,
    },
    {
        path: '/clients',
        routes: client_routes_1.clientRoutes,
    },
    {
        path: '/users',
        routes: user_routes_1.userRoutes,
    },
    {
        path: '/auth',
        routes: auth_route_1.authRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
