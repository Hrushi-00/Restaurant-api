import { Router } from "express";

import StaffController from "./staff.controller.js";

import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";

import ROLES from "../../constants/roles.js";

import {
  createStaffValidation,
  updateStaffValidation,
} from "./staff.validation.js";

const router = Router();

/**
 * Create Staff
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.OWNER, ROLES.ADMIN),
  createStaffValidation,
  validationMiddleware,
  StaffController.createStaff
);

/**
 * Get All Staff
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.OWNER, ROLES.ADMIN, ROLES.MANAGER),
  StaffController.getAllStaff
);

/**
 * Get Staff By ID
 */
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  StaffController.getStaffById
);

/**
 * Update Staff
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.OWNER, ROLES.ADMIN),
  updateStaffValidation,
  validationMiddleware,
  StaffController.updateStaff
);

/**
 * Update Staff Status
 */
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware(ROLES.OWNER, ROLES.ADMIN),
  StaffController.updateStatus
);

/**
 * Delete Staff
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.OWNER),
  StaffController.deleteStaff
);

export default router;