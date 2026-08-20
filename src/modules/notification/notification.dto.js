class NotificationDTO {
  notificationResponse(notification) {
    if (!notification) return null;

    return {
      id: notification._id,

      tenantId: notification.tenantId,

      recipient: notification.recipientId
        ? {
            id: notification.recipientId._id,
            name: notification.recipientId.name,
            email: notification.recipientId.email,
            role: notification.recipientId.role,
          }
        : null,

      type: notification.type,

      title: notification.title,

      message: notification.message,

      reference: {
        type: notification.referenceType,
        id: notification.referenceId,
      },

      isRead: notification.isRead,

      readAt: notification.readAt,

      metadata: notification.metadata,

      createdAt: notification.createdAt,

      updatedAt: notification.updatedAt,
    };
  }

  notificationListResponse(result) {
    return {
      items: result.items.map((notification) =>
        this.notificationResponse(notification)
      ),

      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
    };
  }

  unreadResponse(notifications, unreadCount) {
    return {
      items: notifications.map((notification) =>
        this.notificationResponse(notification)
      ),

      unreadCount,
    };
  }
}

export default new NotificationDTO();