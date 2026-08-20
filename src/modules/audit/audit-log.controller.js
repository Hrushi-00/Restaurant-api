import AuditLogService from "./audit-log.service.js";

import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

class AuditLogController {
  getAllLogs = asyncHandler(async (req, res) => {
    const logs =
      await AuditLogService.getAllLogs(
        req.user,
        req.query
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        logs,
        "Audit logs fetched successfully."
      )
    );
  });

  getLogById = asyncHandler(async (req, res) => {
    const log =
      await AuditLogService.getLogById(
        req.user,
        req.params.id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        log,
        "Audit log fetched successfully."
      )
    );
  });

  getLogsByUser = asyncHandler(
    async (req, res) => {
      const logs =
        await AuditLogService.getLogsByUser(
          req.user,
          req.params.userId,
          req.query
        );

      return res.status(200).json(
        new ApiResponse(
          200,
          logs,
          "User audit logs fetched successfully."
        )
      );
    }
  );

  getLogsByModule = asyncHandler(
    async (req, res) => {
      const logs =
        await AuditLogService.getLogsByModule(
          req.user,
          req.params.module,
          req.query
        );

      return res.status(200).json(
        new ApiResponse(
          200,
          logs,
          "Module audit logs fetched successfully."
        )
      );
    }
  );

  getLogsByRecord = asyncHandler(
    async (req, res) => {
      const logs =
        await AuditLogService.getLogsByRecord(
          req.user,
          req.params.recordId
        );

      return res.status(200).json(
        new ApiResponse(
          200,
          logs,
          "Record audit logs fetched successfully."
        )
      );
    }
  );
}

export default new AuditLogController();