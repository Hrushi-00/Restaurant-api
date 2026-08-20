import StockMovementService from "./stock-movement.service.js";

import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

class StockMovementController {
  createMovement = asyncHandler(async (req, res) => {
    const movement =
      await StockMovementService.createMovement(
        req.user,
        req.body
      );

    return res.status(201).json(
      new ApiResponse(
        201,
        movement,
        "Stock movement created successfully."
      )
    );
  });

  getAllMovements = asyncHandler(async (req, res) => {
    const movements =
      await StockMovementService.getAllMovements(
        req.user,
        req.query
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        movements,
        "Stock movements fetched successfully."
      )
    );
  });

  getMovementById = asyncHandler(async (req, res) => {
    const movement =
      await StockMovementService.getMovementById(
        req.user,
        req.params.id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        movement,
        "Stock movement fetched successfully."
      )
    );
  });

  getInventoryMovements = asyncHandler(
    async (req, res) => {
      const movements =
        await StockMovementService.getInventoryMovements(
          req.user,
          req.params.inventoryId,
          req.query
        );

      return res.status(200).json(
        new ApiResponse(
          200,
          movements,
          "Inventory stock movements fetched successfully."
        )
      );
    }
  );

  getReferenceMovements = asyncHandler(
    async (req, res) => {
      const movements =
        await StockMovementService.getReferenceMovements(
          req.user,
          req.params.referenceType,
          req.params.referenceId
        );

      return res.status(200).json(
        new ApiResponse(
          200,
          movements,
          "Reference stock movements fetched successfully."
        )
      );
    }
  );
}

export default new StockMovementController();