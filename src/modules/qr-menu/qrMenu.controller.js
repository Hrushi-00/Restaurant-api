import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import QrMenuService from "./qrMenu.service.js";

class QrMenuController {
  createQrMenu = asyncHandler(async (req, res) => {
    const result = await QrMenuService.createQrMenu(
      req.user,
      req.body
    );

    return res.status(201).json(
      new ApiResponse(
        201,
        result,
        "QR Menu created successfully."
      )
    );
  });

  getAllQrMenus = asyncHandler(async (req, res) => {
    const result = await QrMenuService.getAllQrMenus(
      req.user
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        result,
        "QR Menus fetched successfully."
      )
    );
  });

  getQrMenuById = asyncHandler(async (req, res) => {
    const result = await QrMenuService.getQrMenuById(
      req.user,
      req.params.id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        result,
        "QR Menu fetched successfully."
      )
    );
  });

  updateStatus = asyncHandler(async (req, res) => {
    const result = await QrMenuService.updateStatus(
      req.user,
      req.params.id,
      req.body.status
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        result,
        "QR Menu status updated successfully."
      )
    );
  });

  regenerateQr = asyncHandler(async (req, res) => {
    const result = await QrMenuService.regenerateQr(
      req.user,
      req.params.id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        result,
        "QR Menu regenerated successfully."
      )
    );
  });

  scanQr = asyncHandler(async (req, res) => {
    const result = await QrMenuService.scanQr(
      req.params.qrCode
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        result,
        "QR Menu scanned successfully."
      )
    );
  });

  deleteQrMenu = asyncHandler(async (req, res) => {
    await QrMenuService.deleteQrMenu(
      req.user,
      req.params.id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "QR Menu deleted successfully."
      )
    );
  });
}

export default new QrMenuController();