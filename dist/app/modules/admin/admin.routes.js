"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("../user/user.validation");
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
router.get('/', admin_controller_1.adminController.getAllAdmins);
router.get('/:id', admin_controller_1.adminController.getAdminById);
router.patch('/:id', (0, validateRequest_1.default)(user_validation_1.UserValidation.UserUpdateValidationSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.adminController.updateAdminById);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), admin_controller_1.adminController.deleteAdminById);
exports.adminRoutes = router;
