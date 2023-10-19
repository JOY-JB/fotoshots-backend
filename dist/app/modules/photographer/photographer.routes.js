"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.photographerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("../user/user.validation");
const photographer_controller_1 = require("./photographer.controller");
const router = express_1.default.Router();
router.get('/', photographer_controller_1.photographerController.getAllPhotographers);
router.get('/:id', photographer_controller_1.photographerController.getPhotographerById);
router.patch('/:id', (0, validateRequest_1.default)(user_validation_1.UserValidation.UserUpdateValidationSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.PHOTOGRAPHER), photographer_controller_1.photographerController.updatePhotographerById);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), photographer_controller_1.photographerController.deletePhotographerById);
exports.photographerRoutes = router;
