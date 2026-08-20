import Notification from "./notification.model.js";

class NotificationRepository {
  async create(payload) {
    return await Notification.create(payload);
  }

  async findById(id) {
    return await Notification.findById(id)
      .populate(
        "recipientId",
        "name email role"
      );
  }

  async findAllByRecipient(
    tenantId,
    recipientId,
    {
      page = 1,
      limit = 20,
      isRead,
      type,
    } = {}
  ) {
    const filter = {
      tenantId,
      recipientId,
    };

    if (isRead !== undefined) {
      filter.isRead =
        isRead === true ||
        isRead === "true";
    }

    if (type) {
      filter.type = type;
    }

    const [items, total] =
      await Promise.all([
        Notification.find(filter)
          .populate(
            "recipientId",
            "name email role"
          )
          .sort({
            createdAt: -1,
          })
          .skip((page - 1) * limit)
          .limit(limit),

        Notification.countDocuments(filter),
      ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(
        total / limit
      ),
    };
  }

  async findUnreadByRecipient(
    tenantId,
    recipientId
  ) {
    return await Notification.find({
      tenantId,
      recipientId,
      isRead: false,
    })
      .sort({
        createdAt: -1,
      });
  }

  async countUnread(
    tenantId,
    recipientId
  ) {
    return await Notification.countDocuments({
      tenantId,
      recipientId,
      isRead: false,
    });
  }

  async markAsRead(
    tenantId,
    recipientId,
    id
  ) {
    return await Notification.findOneAndUpdate(
      {
        _id: id,
        tenantId,
        recipientId,
      },
      {
        isRead: true,
        readAt: new Date(),
      },
      {
        new: true,
      }
    );
  }

  async markAllAsRead(
    tenantId,
    recipientId
  ) {
    return await Notification.updateMany(
      {
        tenantId,
        recipientId,
        isRead: false,
      },
      {
        $set: {
          isRead: true,
          readAt: new Date(),
        },
      }
    );
  }

  async delete(
    tenantId,
    recipientId,
    id
  ) {
    return await Notification.findOneAndDelete({
      _id: id,
      tenantId,
      recipientId,
    });
  }

  async deleteAllRead(
    tenantId,
    recipientId
  ) {
    return await Notification.deleteMany({
      tenantId,
      recipientId,
      isRead: true,
    });
  }
}

export default new NotificationRepository();