import { Router } from "express";

import PurchaseController from "./purchase.controller.js";

import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";

import {
  createPurchaseValidation,
  updatePurchaseValidation,
  receivePurchaseValidation,
  cancelPurchaseValidation,
  purchaseIdValidation,
  purchaseListValidation,
} from "./purchase.validation.js";

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
  createPurchaseValidation,
  validationMiddleware,
  PurchaseController.createPurchase
);

router.get(
  "/list",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  purchaseListValidation,
  validationMiddleware,
  PurchaseController.getAllPurchases
);

router.get(
  "/details/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  purchaseIdValidation,
  validationMiddleware,
  PurchaseController.getPurchaseById
);

router.patch(
  "/update/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  updatePurchaseValidation,
  validationMiddleware,
  PurchaseController.updatePurchase
);

router.patch(
  "/receive/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  receivePurchaseValidation,
  validationMiddleware,
  PurchaseController.receivePurchase
);

router.patch(
  "/cancel/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  cancelPurchaseValidation,
  validationMiddleware,
  PurchaseController.cancelPurchase
);

router.delete(
  "/delete/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN
  ),
  purchaseIdValidation,
  validationMiddleware,
  PurchaseController.deletePurchase
);

export default router;