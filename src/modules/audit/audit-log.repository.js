import AuditLog from "./audit-log.model.js";

class AuditLogRepository {
  async create(payload) {
    return await AuditLog.create(payload);
  }

  async findById(id) {
    return await AuditLog.findById(id)
      .populate(
        "userId",
        "name email role"
      );
  }

  async findAllByTenant(
    tenantId,
    {
      page = 1,
      limit = 20,
      userId,
      action,
      module,
      fromDate,
      toDate,
    } = {}
  ) {
    const filter = {
      tenantId,
    };

    if (userId) {
      filter.userId = userId;
    }

    if (action) {
      filter.action = action;
    }

    if (module) {
      filter.module = module;
    }

    if (fromDate || toDate) {
      filter.createdAt = {};

      if (fromDate) {
        filter.createdAt.$gte =
          new Date(fromDate);
      }

      if (toDate) {
        const endDate = new Date(toDate);

        endDate.setHours(
          23,
          59,
          59,
          999
        );

        filter.createdAt.$lte =
          endDate;
      }
    }

    const [items, total] =
      await Promise.all([
        AuditLog.find(filter)
          .populate(
            "userId",
            "name email role"
          )
          .sort({
            createdAt: -1,
          })
          .skip((page - 1) * limit)
          .limit(limit),

        AuditLog.countDocuments(filter),
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

  async findByUser(
    tenantId,
    userId,
    {
      page = 1,
      limit = 20,
    } = {}
  ) {
    const filter = {
      tenantId,
      userId,
    };

    const [items, total] =
      await Promise.all([
        AuditLog.find(filter)
          .populate(
            "userId",
            "name email role"
          )
          .sort({
            createdAt: -1,
          })
          .skip((page - 1) * limit)
          .limit(limit),

        AuditLog.countDocuments(filter),
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

  async findByModule(
    tenantId,
    module,
    {
      page = 1,
      limit = 20,
    } = {}
  ) {
    const filter = {
      tenantId,
      module,
    };

    const [items, total] =
      await Promise.all([
        AuditLog.find(filter)
          .populate(
            "userId",
            "name email role"
          )
          .sort({
            createdAt: -1,
          })
          .skip((page - 1) * limit)
          .limit(limit),

        AuditLog.countDocuments(filter),
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

  async findByRecord(
    tenantId,
    recordId
  ) {
    return await AuditLog.find({
      tenantId,
      recordId,
    })
      .populate(
        "userId",
        "name email role"
      )
      .sort({
        createdAt: -1,
      });
  }

  async countByTenant(tenantId) {
    return await AuditLog.countDocuments({
      tenantId,
    });
  }
}

export default new AuditLogRepository();