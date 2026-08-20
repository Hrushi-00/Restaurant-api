import NotificationService from "./notification.service.js";

import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

class NotificationController {
  createNotification = asyncHandler(
    async (req, res) => {
      const notification =
        await NotificationService.createNotification(
          req.user,
          req.body
        );

      return res.status(201).json(
        new ApiResponse(
          201,
          notification,
          "Notification created successfully."
        )
      );
    }
  );

  getNotifications = asyncHandler(
    async (req, res) => {
      const notifications =
        await NotificationService.getNotifications(
          req.user,
          req.query
        );

      return res.status(200).json(
        new ApiResponse(
          200,
          notifications,
          "Notifications fetched successfully."
        )
      );
    }
  );

  getUnreadNotifications = asyncHandler(
    async (req, res) => {
      const notifications =
        await NotificationService.getUnreadNotifications(
          req.user
        );

      return res.status(200).json(
        new ApiResponse(
          200,
          notifications,
          "Unread notifications fetched successfully."
        )
      );
    }
  );

  markAsRead = asyncHandler(
    async (req, res) => {
      const notification =
        await NotificationService.markAsRead(
          req.user,
          req.params.id
        );

      return res.status(200).json(
        new ApiResponse(
          200,
          notification,
          "Notification marked as read."
        )
      );
    }
  );

  markAllAsRead = asyncHandler(
    async (req, res) => {
      await NotificationService.markAllAsRead(
        req.user
      );

      return res.status(200).json(
        new ApiResponse(
          200,
          null,
          "All notifications marked as read."
        )
      );
    }
  );

  deleteNotification = asyncHandler(
    async (req, res) => {
      await NotificationService.deleteNotification(
        req.user,
        req.params.id
      );

      return res.status(200).json(
        new ApiResponse(
          200,
          null,
          "Notification deleted successfully."
        )
      );
    }
  );
}

export default new NotificationController();