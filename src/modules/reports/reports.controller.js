import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import ReportsService from "./reports.service.js";

class ReportsController {
  getDashboardReport = asyncHandler(async (req, res) => {
    const report = ReportsService.getDashboardReport(req.query);

    return res.status(200).json(
      new ApiResponse(200, report, "Dashboard report fetched successfully.")
    );
  });

  getSalesReport = asyncHandler(async (req, res) => {
    const report = ReportsService.getSalesReport(req.query);

    return res.status(200).json(
      new ApiResponse(200, report, "Sales report fetched successfully.")
    );
  });

  getPurchaseReport = asyncHandler(async (req, res) => {
    const report = ReportsService.getPurchaseReport(req.query);

    return res.status(200).json(
      new ApiResponse(200, report, "Purchase report fetched successfully.")
    );
  });

  getInventoryReport = asyncHandler(async (req, res) => {
    const report = ReportsService.getInventoryReport(req.query);

    return res.status(200).json(
      new ApiResponse(200, report, "Inventory report fetched successfully.")
    );
  });

  getStockMovementReport = asyncHandler(async (req, res) => {
    const report = ReportsService.getStockMovementReport(req.query);

    return res.status(200).json(
      new ApiResponse(
        200,
        report,
        "Stock movement report fetched successfully."
      )
    );
  });

  getPaymentReport = asyncHandler(async (req, res) => {
    const report = ReportsService.getPaymentReport(req.query);

    return res.status(200).json(
      new ApiResponse(200, report, "Payment report fetched successfully.")
    );
  });

  getOrderReport = asyncHandler(async (req, res) => {
    const report = ReportsService.getOrderReport(req.query);

    return res.status(200).json(
      new ApiResponse(200, report, "Order report fetched successfully.")
    );
  });
}

export default new ReportsController();
