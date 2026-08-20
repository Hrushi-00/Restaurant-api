import { Router } from "express";

import AuditLogController from "./audit-log.controller.js";

import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";

import {
  auditLogIdValidation,
  auditLogUserValidation,
  auditLogRecordValidation,
  auditLogModuleValidation,
  auditLogListValidation,
} from "./audit-log.validation.js";

import { ROLES } from "../../constants/roles.js";

const router = Router();

router.use(authMiddleware);

// Get all audit logs
router.get(
  "/list",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN
  ),
  auditLogListValidation,
  validationMiddleware,
  AuditLogController.getAllLogs
);

// Get audit log by ID
router.get(
  "/details/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN
  ),
  auditLogIdValidation,
  validationMiddleware,
  AuditLogController.getLogById
);

// Get logs by user
router.get(
  "/user/:userId",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN
  ),
  auditLogUserValidation,
  auditLogListValidation,
  validationMiddleware,
  AuditLogController.getLogsByUser
);

// Get logs by module
router.get(
  "/module/:module",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN
  ),
  auditLogModuleValidation,
  auditLogListValidation,
  validationMiddleware,
  AuditLogController.getLogsByModule
);

// Get logs by record
router.get(
  "/record/:recordId",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN
  ),
  auditLogRecordValidation,
  validationMiddleware,
  AuditLogController.getLogsByRecord
);

export default router;