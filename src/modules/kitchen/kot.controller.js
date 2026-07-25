import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import KOTService from "./kot.service.js";

class KOTController {
  createKOT = asyncHandler(async (req, res) => {
    const result = await KOTService.createKOT(
      req.user,
      req.body
    );

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          result,
          "Kitchen ticket created successfully."
        )
      );
  });

  getAllKOT = asyncHandler(async (req, res) => {
    const result = await KOTService.getAllKOT(
      req.user
    );

    return res.json(
      new ApiResponse(
        200,
        result,
        "Kitchen tickets fetched successfully."
      )
    );
  });

  getKOTById = asyncHandler(async (req, res) => {
    const result =
      await KOTService.getKOTById(
        req.user,
        req.params.id
      );

    return res.json(
      new ApiResponse(
        200,
        result,
        "Kitchen ticket fetched successfully."
      )
    );
  });

  getKitchenQueue = asyncHandler(async (req, res) => {
    const result =
      await KOTService.getKitchenQueue(
        req.user
      );

    return res.json(
      new ApiResponse(
        200,
        result,
        "Kitchen queue fetched successfully."
      )
    );
  });

  getReadyOrders = asyncHandler(async (req, res) => {
    const result =
      await KOTService.getReadyOrders(
        req.user
      );

    return res.json(
      new ApiResponse(
        200,
        result,
        "Ready orders fetched successfully."
      )
    );
  });

  updateStatus = asyncHandler(async (req, res) => {
    const result =
      await KOTService.updateStatus(
        req.user,
        req.params.id,
        req.body.status
      );

    return res.json(
      new ApiResponse(
        200,
        result,
        "Kitchen ticket status updated successfully."
      )
    );
  });

  assignChef = asyncHandler(async (req, res) => {
    const result =
      await KOTService.assignChef(
        req.user,
        req.params.id,
        req.body.chefId
      );

    return res.json(
      new ApiResponse(
        200,
        result,
        "Chef assigned successfully."
      )
    );
  });

  deleteKOT = asyncHandler(async (req, res) => {
    await KOTService.deleteKOT(
      req.user,
      req.params.id
    );

    return res.json(
      new ApiResponse(
        200,
        null,
        "Kitchen ticket deleted successfully."
      )
    );
  });
}

export default new KOTController();