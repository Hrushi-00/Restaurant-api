import NotificationRepository from "./notification.repository.js";
import NotificationDTO from "./notification.dto.js";

import ApiError from "../../utils/ApiError.js";

class NotificationService {
  resolveTenantId(user) {
    if (user.tenantId) {
      return user.tenantId;
    }

    if (user.restaurantId) {
      return user.restaurantId;
    }

    throw new ApiError(
      400,
      "Tenant ID not found."
    );
  }

  async createNotification(user, payload) {
    const tenantId =
      this.resolveTenantId(user);

    const notification =
      await NotificationRepository.create({
        tenantId,

        recipientId:
          payload.recipientId,

        type: payload.type,

        title: payload.title,

        message: payload.message,

        referenceType:
          payload.referenceType ||
          "SYSTEM",

        referenceId:
          payload.referenceId ||
          null,

        metadata:
          payload.metadata || {},
      });

    const created =
      await NotificationRepository.findById(
        notification._id
      );

    return NotificationDTO.notificationResponse(
      created
    );
  }

  async getNotifications(user, query) {
    const tenantId =
      this.resolveTenantId(user);

    const result =
      await NotificationRepository.findAllByRecipient(
        tenantId,
        user.id,
        query
      );

    return NotificationDTO.notificationListResponse(
      result
    );
  }

  async getUnreadNotifications(user) {
    const tenantId =
      this.resolveTenantId(user);

    const notifications =
      await NotificationRepository.findUnreadByRecipient(
        tenantId,
        user.id
      );

    const unreadCount =
      await NotificationRepository.countUnread(
        tenantId,
        user.id
      );

    return NotificationDTO.unreadResponse(
      notifications,
      unreadCount
    );
  }

  async markAsRead(user, id) {
    const tenantId =
      this.resolveTenantId(user);

    const notification =
      await NotificationRepository.markAsRead(
        tenantId,
        user.id,
        id
      );

    if (!notification) {
      throw new ApiError(
        404,
        "Notification not found."
      );
    }

    return NotificationDTO.notificationResponse(
      notification
    );
  }

  async markAllAsRead(user) {
    const tenantId =
      this.resolveTenantId(user);

    await NotificationRepository.markAllAsRead(
      tenantId,
      user.id
    );

    return null;
  }

  async deleteNotification(user, id) {
    const tenantId =
      this.resolveTenantId(user);

    const notification =
      await NotificationRepository.delete(
        tenantId,
        user.id,
        id
      );

    if (!notification) {
      throw new ApiError(
        404,
        "Notification not found."
      );
    }

    return null;
  }
}

export default new NotificationService();