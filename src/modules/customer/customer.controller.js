import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import CustomerService from "./customer.service.js";

class CustomerController {
  // Create Customer
  createCustomer = asyncHandler(async (req, res) => {
    const customer = await CustomerService.createCustomer(
      req.user,
      req.body
    );

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          customer,
          "Customer created successfully"
        )
      );
  });

  // Get All Customers
  getAllCustomers = asyncHandler(async (req, res) => {
    const customers = await CustomerService.getAllCustomers(
      req.user
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          customers,
          "Customers fetched successfully"
        )
      );
  });

  // Get Customer By Id
  getCustomerById = asyncHandler(async (req, res) => {
    const customer = await CustomerService.getCustomerById(
      req.user,
      req.params.id
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          customer,
          "Customer fetched successfully"
        )
      );
  });

  // Search Customers
  searchCustomers = asyncHandler(async (req, res) => {
    const customers =
      await CustomerService.searchCustomers(
        req.user,
        req.query.keyword || ""
      );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          customers,
          "Customers fetched successfully"
        )
      );
  });

  // Top Customers
  getTopCustomers = asyncHandler(async (req, res) => {
    const customers =
      await CustomerService.getTopCustomers(
        req.user
      );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          customers,
          "Top customers fetched successfully"
        )
      );
  });

  // Recent Customers
  getRecentCustomers = asyncHandler(async (req, res) => {
    const customers =
      await CustomerService.getRecentCustomers(
        req.user
      );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          customers,
          "Recent customers fetched successfully"
        )
      );
  });

  // Update Customer
  updateCustomer = asyncHandler(async (req, res) => {
    const customer = await CustomerService.updateCustomer(
      req.user,
      req.params.id,
      req.body
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          customer,
          "Customer updated successfully"
        )
      );
  });

  // Delete Customer
  deleteCustomer = asyncHandler(async (req, res) => {
    await CustomerService.deleteCustomer(
      req.user,
      req.params.id
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          "Customer deleted successfully"
        )
      );
  });
}

export default new CustomerController();