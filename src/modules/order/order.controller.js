import OrderService from "./order.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

class OrderController {
  // Create Order
  createOrder = asyncHandler(async (req, res) => {
    const order = await OrderService.createOrder(
      req.user,
      req.body
    );

    return res.status(201).json(
      new ApiResponse(
        201,
        order,
        "Order created successfully"
      )
    );
  });

  // Get All Orders
  getAllOrders = asyncHandler(async (req, res) => {
    const orders = await OrderService.getAllOrders(
      req.user
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        orders,
        "Orders fetched successfully"
      )
    );
  });

  // Get Order By ID
  getOrderById = asyncHandler(async (req, res) => {
    const order = await OrderService.getOrderById(
      req.user,
      req.params.id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        order,
        "Order fetched successfully"
      )
    );
  });

  // Update Order
  updateOrder = asyncHandler(async (req, res) => {
    const order = await OrderService.updateOrder(
      req.user,
      req.params.id,
      req.body
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        order,
        "Order updated successfully"
      )
    );
  });

  // Update Order Status
  updateOrderStatus = asyncHandler(async (req, res) => {
    const order =
      await OrderService.updateOrderStatus(
        req.user,
        req.params.id,
        req.body.orderStatus
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        order,
        "Order status updated successfully"
      )
    );
  });

  // Update Payment Status
  updatePaymentStatus = asyncHandler(async (req, res) => {
    const order =
      await OrderService.updatePaymentStatus(
        req.user,
        req.params.id,
        req.body.paymentStatus
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        order,
        "Payment status updated successfully"
      )
    );
  });

  // Delete Order
  deleteOrder = asyncHandler(async (req, res) => {
    await OrderService.deleteOrder(
      req.user,
      req.params.id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Order deleted successfully"
      )
    );
  });
}

export default new OrderController();