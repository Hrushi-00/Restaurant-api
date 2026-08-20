import { Router } from "express";

import StockMovementController from "./stock-movement.controller.js";

import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";

import {
  createStockMovementValidation,
  stockMovementIdValidation,
  inventoryMovementValidation,
  stockMovementListValidation,
} from "./stock-movement.validation.js";

import { ROLES } from "../../constants/roles.js";

const router = Router();

router.use(authMiddleware);

router.post(
  "/create",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  createStockMovementValidation,
  validationMiddleware,
  StockMovementController.createMovement
);

router.get(
  "/list",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  stockMovementListValidation,
  validationMiddleware,
  StockMovementController.getAllMovements
);

router.get(
  "/details/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  stockMovementIdValidation,
  validationMiddleware,
  StockMovementController.getMovementById
);

router.get(
  "/inventory/:inventoryId",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  inventoryMovementValidation,
  validationMiddleware,
  StockMovementController.getInventoryMovements
);

router.get(
  "/reference/:referenceType/:referenceId",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  StockMovementController.getReferenceMovements
);

export default router;