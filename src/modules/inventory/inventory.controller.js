import InventoryService from "./inventory.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

class InventoryController {
  createInventory = asyncHandler(async (req, res) => {
    const inventory = await InventoryService.createInventory(
      req.user,
      req.body
    );

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          inventory,
          "Inventory created successfully."
        )
      );
  });

  getAllInventories = asyncHandler(async (req, res) => {
    const inventories =
      await InventoryService.getAllInventories(
        req.user,
        req.query
      );

    return res.json(
      new ApiResponse(
        200,
        inventories,
        "Inventory fetched successfully."
      )
    );
  });

  getInventoryById = asyncHandler(async (req, res) => {
    const inventory =
      await InventoryService.getInventoryById(
        req.user,
        req.params.id
      );

    return res.json(
      new ApiResponse(
        200,
        inventory,
        "Inventory details fetched successfully."
      )
    );
  });

  updateInventory = asyncHandler(async (req, res) => {
    const inventory =
      await InventoryService.updateInventory(
        req.user,
        req.params.id,
        req.body
      );

    return res.json(
      new ApiResponse(
        200,
        inventory,
        "Inventory updated successfully."
      )
    );
  });

  stockIn = asyncHandler(async (req, res) => {
    const result = await InventoryService.stockIn(
      req.user,
      req.params.id,
      req.body.quantity
    );

    return res.json(
      new ApiResponse(
        200,
        result,
        "Stock added successfully."
      )
    );
  });

  stockOut = asyncHandler(async (req, res) => {
    const result = await InventoryService.stockOut(
      req.user,
      req.params.id,
      req.body.quantity
    );

    return res.json(
      new ApiResponse(
        200,
        result,
        "Stock deducted successfully."
      )
    );
  });

  adjustStock = asyncHandler(async (req, res) => {
    const result =
      await InventoryService.adjustStock(
        req.user,
        req.params.id,
        req.body.quantity
      );

    return res.json(
      new ApiResponse(
        200,
        result,
        "Stock adjusted successfully."
      )
    );
  });

  getLowStockItems = asyncHandler(async (req, res) => {
    const items =
      await InventoryService.getLowStockItems(
        req.user
      );

    return res.json(
      new ApiResponse(
        200,
        items,
        "Low stock items fetched successfully."
      )
    );
  });

  getExpiringItems = asyncHandler(async (req, res) => {
    const items =
      await InventoryService.getExpiringItems(
        req.user,
        req.query.days
      );

    return res.json(
      new ApiResponse(
        200,
        items,
        "Expiring items fetched successfully."
      )
    );
  });

  deleteInventory = asyncHandler(async (req, res) => {
    const result =
      await InventoryService.deleteInventory(
        req.user,
        req.params.id
      );

    return res.json(
      new ApiResponse(
        200,
        result,
        result.message
      )
    );
  });
}

export default new InventoryController();