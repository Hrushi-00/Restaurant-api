import { Router } from "express";

import QrMenuController from "./qrMenu.controller.js";

import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import validate from "../../middlewares/validation.middleware.js";

import {
  createQrMenuValidation,
  updateQrMenuStatusValidation,
  qrMenuIdValidation,
  scanQrValidation,
} from "./qrMenu.validation.js";

import { ROLES } from "../../constants/roles.js";

const router = Router();

router.get(
  "/scan/:qrCode",
  scanQrValidation,
  validate,
  QrMenuController.scanQr
);

router.use(authMiddleware);

router.post(
  "/create",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  createQrMenuValidation,
  validate,
  QrMenuController.createQrMenu
);

router.get(
  "/list",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  QrMenuController.getAllQrMenus
);

router.get(
  "/details/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  qrMenuIdValidation,
  validate,
  QrMenuController.getQrMenuById
);

router.patch(
  "/update-status/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  updateQrMenuStatusValidation,
  validate,
  QrMenuController.updateStatus
);

router.patch(
  "/regenerate/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  qrMenuIdValidation,
  validate,
  QrMenuController.regenerateQr
);

router.delete(
  "/delete/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN
  ),
  qrMenuIdValidation,
  validate,
  QrMenuController.deleteQrMenu
);

export default router;