import { Router } from "express";

import SettingsController from "./settings.controller.js";

import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";

import {
  updateSettingsValidation,
} from "./settings.validation.js";

import { ROLES } from "../../constants/roles.js";

const router = Router();

router.use(authMiddleware);

// Get restaurant settings
router.get(
  "/",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  SettingsController.getSettings
);

// Update restaurant settings
router.put(
  "/",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN
  ),
  updateSettingsValidation,
  validationMiddleware,
  SettingsController.updateSettings
);

export default router;