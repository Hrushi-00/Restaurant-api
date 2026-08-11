import SupplierService from "./supplier.service.js";

import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

class SupplierController {
  createSupplier = asyncHandler(async (req, res) => {
    const supplier =
      await SupplierService.createSupplier(
        req.user,
        req.body
      );

    return res.status(201).json(
      new ApiResponse(
        201,
        supplier,
        "Supplier created successfully."
      )
    );
  });

  getAllSuppliers = asyncHandler(async (req, res) => {
    const suppliers =
      await SupplierService.getAllSuppliers(
        req.user,
        req.query
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        suppliers,
        "Suppliers fetched successfully."
      )
    );
  });

  getSupplierById = asyncHandler(async (req, res) => {
    const supplier =
      await SupplierService.getSupplierById(
        req.user,
        req.params.id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        supplier,
        "Supplier fetched successfully."
      )
    );
  });

  updateSupplier = asyncHandler(async (req, res) => {
    const supplier =
      await SupplierService.updateSupplier(
        req.user,
        req.params.id,
        req.body
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        supplier,
        "Supplier updated successfully."
      )
    );
  });

  updateSupplierStatus = asyncHandler(async (req, res) => {
    const supplier =
      await SupplierService.updateSupplierStatus(
        req.user,
        req.params.id,
        req.body.status
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        supplier,
        "Supplier status updated successfully."
      )
    );
  });

  getActiveSuppliers = asyncHandler(async (req, res) => {
    const suppliers =
      await SupplierService.getActiveSuppliers(
        req.user
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        suppliers,
        "Active suppliers fetched successfully."
      )
    );
  });

  deleteSupplier = asyncHandler(async (req, res) => {
    await SupplierService.deleteSupplier(
      req.user,
      req.params.id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Supplier deleted successfully."
      )
    );
  });
}

export default new SupplierController();