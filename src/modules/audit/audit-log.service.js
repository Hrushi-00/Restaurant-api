import AuditLogRepository from "./audit-log.repository.js";
import AuditLogDTO from "./audit-log.dto.js";

import ApiError from "../../utils/ApiError.js";

class AuditLogService {
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

  async createLog(user, payload, req = null) {
    const tenantId =
      this.resolveTenantId(user);

    const log =
      await AuditLogRepository.create({
        tenantId,

        userId: user.id,

        action: payload.action,

        module: payload.module,

        recordId:
          payload.recordId || null,

        description:
          payload.description || "",

        oldData:
          payload.oldData || null,

        newData:
          payload.newData || null,

        ipAddress:
          req?.ip || null,

        userAgent:
          req?.get("user-agent") || null,

        metadata:
          payload.metadata || {},
      });

    const created =
      await AuditLogRepository.findById(
        log._id
      );

    return AuditLogDTO.auditLogResponse(
      created
    );
  }

  async getAllLogs(user, query) {
    const tenantId =
      this.resolveTenantId(user);

    const result =
      await AuditLogRepository.findAllByTenant(
        tenantId,
        query
      );

    return AuditLogDTO.auditLogListResponse(
      result
    );
  }

  async getLogById(user, id) {
    const tenantId =
      this.resolveTenantId(user);

    const log =
      await AuditLogRepository.findById(id);

    if (
      !log ||
      String(log.tenantId) !==
        String(tenantId)
    ) {
      throw new ApiError(
        404,
        "Audit log not found."
      );
    }

    return AuditLogDTO.auditLogResponse(
      log
    );
  }

  async getLogsByUser(
    user,
    userId,
    query
  ) {
    const tenantId =
      this.resolveTenantId(user);

    const result =
      await AuditLogRepository.findByUser(
        tenantId,
        userId,
        query
      );

    return AuditLogDTO.auditLogListResponse(
      result
    );
  }

  async getLogsByModule(
    user,
    module,
    query
  ) {
    const tenantId =
      this.resolveTenantId(user);

    const result =
      await AuditLogRepository.findByModule(
        tenantId,
        module,
        query
      );

    return AuditLogDTO.auditLogListResponse(
      result
    );
  }

  async getLogsByRecord(
    user,
    recordId
  ) {
    const tenantId =
      this.resolveTenantId(user);

    const logs =
      await AuditLogRepository.findByRecord(
        tenantId,
        recordId
      );

    return AuditLogDTO.auditLogArrayResponse(
      logs
    );
  }
}

export default new AuditLogService();