"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("../user/user.validation");
const client_controller_1 = require("./client.controller");
const router = express_1.default.Router();
router.get('/', client_controller_1.clientController.getAllClients);
router.get('/:id', client_controller_1.clientController.getClientById);
router.patch('/:id', (0, validateRequest_1.default)(user_validation_1.UserValidation.UserUpdateValidationSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CLIENT), client_controller_1.clientController.updateClientById);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), client_controller_1.clientController.deleteClientById);
exports.clientRoutes = router;
