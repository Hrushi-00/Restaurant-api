import PurchaseService from "./purchase.service.js";

import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

class PurchaseController {
  createPurchase = asyncHandler(async (req, res) => {
    const purchase =
      await PurchaseService.createPurchase(
        req.user,
        req.body
      );

    return res.status(201).json(
      new ApiResponse(
        201,
        purchase,
        "Purchase created successfully."
      )
    );
  });

  getAllPurchases = asyncHandler(async (req, res) => {
    const purchases =
      await PurchaseService.getAllPurchases(
        req.user,
        req.query
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        purchases,
        "Purchases fetched successfully."
      )
    );
  });

  getPurchaseById = asyncHandler(async (req, res) => {
    const purchase =
      await PurchaseService.getPurchaseById(
        req.user,
        req.params.id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        purchase,
        "Purchase fetched successfully."
      )
    );
  });

  updatePurchase = asyncHandler(async (req, res) => {
    const purchase =
      await PurchaseService.updatePurchase(
        req.user,
        req.params.id,
        req.body
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        purchase,
        "Purchase updated successfully."
      )
    );
  });

  receivePurchase = asyncHandler(async (req, res) => {
    const purchase =
      await PurchaseService.receivePurchase(
        req.user,
        req.params.id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        purchase,
        "Purchase received and inventory updated successfully."
      )
    );
  });

  cancelPurchase = asyncHandler(async (req, res) => {
    const purchase =
      await PurchaseService.cancelPurchase(
        req.user,
        req.params.id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        purchase,
        "Purchase cancelled successfully."
      )
    );
  });

  deletePurchase = asyncHandler(async (req, res) => {
    await PurchaseService.deletePurchase(
      req.user,
      req.params.id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Purchase deleted successfully."
      )
    );
  });
}

export default new PurchaseController();