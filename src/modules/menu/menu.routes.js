import { Router } from "express";

import MenuController from "./menu.controller.js";

import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";

import ROLES from "../../constants/roles.js";

import {
  createMenuValidation,
  updateMenuValidation,
} from "./menu.validation.js";

const router = Router();

/**
 * Create Menu Item
 */
router.post(
  "/create",
  authMiddleware,
  roleMiddleware(ROLES.OWNER, ROLES.ADMIN),
  createMenuValidation,
  validationMiddleware,
  MenuController.createMenu
);

/**
 * Get All Menu Items
 */
router.get(
  "/list",
  authMiddleware,
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.CHEF,
    ROLES.WAITER,
    ROLES.CASHIER
  ),
  MenuController.getAllMenu
);

/**
 * Get Menu Item Details
 */
router.get(
  "/details/:id",
  authMiddleware,
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.CHEF,
    ROLES.WAITER,
    ROLES.CASHIER
  ),
  MenuController.getMenuById
);

/**
 * Update Menu Item
 */
router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware(ROLES.OWNER, ROLES.ADMIN),
  updateMenuValidation,
  validationMiddleware,
  MenuController.updateMenu
);

/**
 * Change Availability
 */
router.patch(
  "/availability/:id",
  authMiddleware,
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  MenuController.updateAvailability
);

/**
 * Delete Menu Item
 */
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware(ROLES.OWNER),
  MenuController.deleteMenu
);

export default router;