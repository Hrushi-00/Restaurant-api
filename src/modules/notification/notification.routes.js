import { Router } from "express";

import NotificationController from "./notification.controller.js";

import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";

import {
  createNotificationValidation,
  notificationIdValidation,
  notificationListValidation,
} from "./notification.validation.js";

import { ROLES } from "../../constants/roles.js";

const router = Router();

router.use(authMiddleware);

// Create notification
router.post(
  "/create",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  createNotificationValidation,
  validationMiddleware,
  NotificationController.createNotification
);

// Get all notifications for logged-in user
router.get(
  "/list",
  notificationListValidation,
  validationMiddleware,
  NotificationController.getNotifications
);

// Get unread notifications
router.get(
  "/unread",
  NotificationController.getUnreadNotifications
);

// Mark single notification as read
router.patch(
  "/read/:id",
  notificationIdValidation,
  validationMiddleware,
  NotificationController.markAsRead
);

// Mark all notifications as read
router.patch(
  "/read-all",
  NotificationController.markAllAsRead
);

// Delete notification
router.delete(
  "/delete/:id",
  notificationIdValidation,
  validationMiddleware,
  NotificationController.deleteNotification
);

export default router;