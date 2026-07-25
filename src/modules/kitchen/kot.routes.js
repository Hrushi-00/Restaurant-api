import { Router } from "express";

import KOTController from "./kot.controller.js";

import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import validate from "../../middlewares/validation.middleware.js";


import {
  createKOTValidation,
  updateKOTStatusValidation,
} from "./kot.validation.js";

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
  createKOTValidation,
  validate,
  KOTController.createKOT
);

router.get(
  "/list",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.CHEF
  ),
  KOTController.getAllKOT
);

router.get(
  "/details/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.CHEF
  ),
  KOTController.getKOTById
);

router.get(
  "/kitchen-queue",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.CHEF
  ),
  KOTController.getKitchenQueue
);

router.get(
  "/ready-orders",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.CHEF,
    ROLES.WAITER
  ),
  KOTController.getReadyOrders
);

router.patch(
  "/update-status/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.CHEF
  ),
  updateKOTStatusValidation,
  validate,
  KOTController.updateStatus
);

router.patch(
  "/assign-chef/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  KOTController.assignChef
);

router.delete(
  "/delete/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN
  ),
  KOTController.deleteKOT
);

export default router;