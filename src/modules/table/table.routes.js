import { Router } from "express";

import TableController from "./table.controller.js";

import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";

import {
  createTableValidation,
  updateTableValidation,
  updateTableStatusValidation,
} from "./table.validation.js";

import { ROLES } from "../../constants/roles.js";

const router = Router();

router.use(authMiddleware);

// Create Table
router.post(
  "/create",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  createTableValidation,
  validationMiddleware,
  TableController.createTable
);

// Get All Tables
router.get(
  "/list",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.CASHIER,
    ROLES.CHEF
  ),
  TableController.getAllTables
);

// Get Table Details
router.get(
  "/details/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.CASHIER,
    ROLES.CHEF
  ),
  TableController.getTableById
);

// Get Tables By Status
router.get(
  "/status/:status",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.CASHIER,
    ROLES.CHEF
  ),
  TableController.getTablesByStatus
);

// Update Table
router.put(
  "/update/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  updateTableValidation,
  validationMiddleware,
  TableController.updateTable
);

// Update Table Status
router.patch(
  "/status/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.CASHIER
  ),
  updateTableStatusValidation,
  validationMiddleware,
  TableController.updateTableStatus
);

// Delete Table
router.delete(
  "/delete/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN
  ),
  TableController.deleteTable
);

export default router;