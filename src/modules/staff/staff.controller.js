
import StaffService from "./staff.service.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

class StaffController {
  // Create Staff
  createStaff = asyncHandler(async (req, res) => {
    const staff = await StaffService.createStaff(req.user, req.body);

    return res.status(201).json(
      new ApiResponse(
        201,
        staff,
        "Staff created successfully"
      )
    );
  });

  // Get All Staff
  getAllStaff = asyncHandler(async (req, res) => {
    const staff = await StaffService.getAllStaff(req.user);

    return res.status(200).json(
      new ApiResponse(
        200,
        staff,
        "Staff fetched successfully"
      )
    );
  });

  // Get Staff By ID
  getStaffById = asyncHandler(async (req, res) => {
    const staff = await StaffService.getStaffById(req.params.id);

    return res.status(200).json(
      new ApiResponse(
        200,
        staff,
        "Staff fetched successfully"
      )
    );
  });

  // Update Staff
  updateStaff = asyncHandler(async (req, res) => {
    const staff = await StaffService.updateStaff(
      req.params.id,
      req.body
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        staff,
        "Staff updated successfully"
      )
    );
  });

  // Update Staff Status
  updateStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;

    const staff = await StaffService.updateStatus(
      req.params.id,
      status
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        staff,
        "Staff status updated successfully"
      )
    );
  });

  // Delete Staff
  deleteStaff = asyncHandler(async (req, res) => {
    await StaffService.deleteStaff(req.params.id);

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Staff deleted successfully"
      )
    );
  });
}

export default new StaffController();