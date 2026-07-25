import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import TableService from "./table.service.js";

class TableController {
  // Create Table
  createTable = asyncHandler(async (req, res) => {
    const table = await TableService.createTable(
      req.user,
      req.body
    );

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          table,
          "Table created successfully"
        )
      );
  });

  // Get All Tables
  getAllTables = asyncHandler(async (req, res) => {
    const tables = await TableService.getAllTables(
      req.user
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          tables,
          "Tables fetched successfully"
        )
      );
  });

  // Get Table By Id
  getTableById = asyncHandler(async (req, res) => {
    const table = await TableService.getTableById(
      req.user,
      req.params.id
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          table,
          "Table fetched successfully"
        )
      );
  });

  // Get Tables By Status
  getTablesByStatus = asyncHandler(async (req, res) => {
    const tables =
      await TableService.getTablesByStatus(
        req.user,
        req.params.status
      );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          tables,
          "Tables fetched successfully"
        )
      );
  });

  // Update Table
  updateTable = asyncHandler(async (req, res) => {
    const table = await TableService.updateTable(
      req.user,
      req.params.id,
      req.body
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          table,
          "Table updated successfully"
        )
      );
  });

  // Update Table Status
  updateTableStatus = asyncHandler(async (req, res) => {
    const table =
      await TableService.updateTableStatus(
        req.user,
        req.params.id,
        req.body.status
      );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          table,
          "Table status updated successfully"
        )
      );
  });

  // Delete Table
  deleteTable = asyncHandler(async (req, res) => {
    await TableService.deleteTable(
      req.user,
      req.params.id
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          "Table deleted successfully"
        )
      );
  });
}

export default new TableController();