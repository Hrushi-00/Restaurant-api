class AuditLogDTO {
  auditLogResponse(log) {
    if (!log) return null;

    return {
      id: log._id,

      tenantId: log.tenantId,

      user: log.userId
        ? {
            id: log.userId._id,
            name: log.userId.name,
            email: log.userId.email,
            role: log.userId.role,
          }
        : null,

      action: log.action,

      module: log.module,

      recordId: log.recordId,

      description: log.description,

      oldData: log.oldData,

      newData: log.newData,

      ipAddress: log.ipAddress,

      userAgent: log.userAgent,

      metadata: log.metadata,

      createdAt: log.createdAt,

      updatedAt: log.updatedAt,
    };
  }

  auditLogListResponse(result) {
    return {
      items: result.items.map((log) =>
        this.auditLogResponse(log)
      ),

      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
    };
  }

  auditLogArrayResponse(logs) {
    return logs.map((log) =>
      this.auditLogResponse(log)
    );
  }
}

export default new AuditLogDTO();