import { Router } from "express";

import SupplierController from "./supplier.controller.js";

import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";

import {
  createSupplierValidation,
  updateSupplierValidation,
  updateSupplierStatusValidation,
  supplierIdValidation,
  supplierListValidation,
} from "./supplier.validation.js";

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
  createSupplierValidation,
  validationMiddleware,
  SupplierController.createSupplier
);

router.get(
  "/list",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.PURCHASE_MANAGER
  ),
  supplierListValidation,
  validationMiddleware,
  SupplierController.getAllSuppliers
);

router.get(
  "/active",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.PURCHASE_MANAGER
  ),
  SupplierController.getActiveSuppliers
);

router.get(
  "/details/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.PURCHASE_MANAGER
  ),
  supplierIdValidation,
  validationMiddleware,
  SupplierController.getSupplierById
);

router.patch(
  "/update/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  updateSupplierValidation,
  validationMiddleware,
  SupplierController.updateSupplier
);

router.patch(
  "/status/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN
  ),
  updateSupplierStatusValidation,
  validationMiddleware,
  SupplierController.updateSupplierStatus
);

router.delete(
  "/delete/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN
  ),
  supplierIdValidation,
  validationMiddleware,
  SupplierController.deleteSupplier
);

export default router;