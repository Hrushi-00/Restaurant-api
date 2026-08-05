import { Router } from "express";

import InventoryController from "./inventory.controller.js";

import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";

import ROLES from "../../constants/roles.js";

import {
  createInventoryValidation,
  updateInventoryValidation,
  stockInValidation,
  stockOutValidation,
  stockAdjustmentValidation,
  inventoryIdValidation,
  inventoryListValidation,
} from "./inventory.validation.js";

const router = Router();

router.use(authMiddleware);


router.post(
  "/create",
  roleMiddleware([
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
  ]),
  createInventoryValidation,
  validationMiddleware,
  InventoryController.createInventory
);

router.get(
  "/list",
  inventoryListValidation,
  validationMiddleware,
  InventoryController.getAllInventories
);

router.get(
  "/details/:id",
  inventoryIdValidation,
  validationMiddleware,
  InventoryController.getInventoryById
);

router.patch(
  "/update/:id",
  roleMiddleware([
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
  ]),
  updateInventoryValidation,
  validationMiddleware,
  InventoryController.updateInventory
);

router.delete(
  "/delete/:id",
  roleMiddleware([
    ROLES.OWNER,
    ROLES.ADMIN,
  ]),
  inventoryIdValidation,
  validationMiddleware,
  InventoryController.deleteInventory
);



router.patch(
  "/stock-in/:id",
  roleMiddleware([
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
  ]),
  stockInValidation,
  validationMiddleware,
  InventoryController.stockIn
);

router.patch(
  "/stock-out/:id",
  roleMiddleware([
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
  ]),
  stockOutValidation,
  validationMiddleware,
  InventoryController.stockOut
);

router.patch(
  "/adjust-stock/:id",
  roleMiddleware([
    ROLES.OWNER,
    ROLES.ADMIN,
  ]),
  stockAdjustmentValidation,
  validationMiddleware,
  InventoryController.adjustStock
);



router.get(
  "/low-stock",
  InventoryController.getLowStockItems
);

router.get(
  "/expiring-items",
  InventoryController.getExpiringItems
);

export default router;