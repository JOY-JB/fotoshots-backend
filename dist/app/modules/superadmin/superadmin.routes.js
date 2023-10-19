"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.superAdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("../user/user.validation");
const superadmin_controller_1 = require("./superadmin.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(user_validation_1.UserValidation.UserValidationSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), superadmin_controller_1.superAdminController.createSuperAdmin);
router.get('/:id', superadmin_controller_1.superAdminController.getSuperAdminById);
router.patch('/:id', (0, validateRequest_1.default)(user_validation_1.UserValidation.UserUpdateValidationSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), superadmin_controller_1.superAdminController.updateSuperAdminById);
exports.superAdminRoutes = router;
