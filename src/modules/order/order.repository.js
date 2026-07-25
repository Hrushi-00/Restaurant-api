import Order from "./order.model.js";

class OrderRepository {
  // Create Order
  async createOrder(orderData) {
    return await Order.create(orderData);
  }

  // Find By Id
  async findById(orderId, tenantId) {
    return await Order.findOne({
      _id: orderId,
      tenantId,
      isDeleted: false,
    }).lean();
  }

  // Find By Order Number
  async findByOrderNumber(orderNumber, tenantId) {
    return await Order.findOne({
      orderNumber,
      tenantId,
      isDeleted: false,
    }).lean();
  }

  // Get All Orders
  async findAllByTenant(tenantId) {
    return await Order.find({
      tenantId,
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .lean();
  }

  // Get Orders By Status
  async findByStatus(tenantId, orderStatus) {
    return await Order.find({
      tenantId,
      orderStatus,
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .lean();
  }

  // Update Order
  async updateOrder(orderId, tenantId, updateData) {
    return await Order.findOneAndUpdate(
      {
        _id: orderId,
        tenantId,
        isDeleted: false,
      },
      updateData,
      {
        new: true,
      }
    ).lean();
  }

  // Update Order Status
  async updateOrderStatus(
    orderId,
    tenantId,
    orderStatus
  ) {
    return await Order.findOneAndUpdate(
      {
        _id: orderId,
        tenantId,
        isDeleted: false,
      },
      {
        orderStatus,
      },
      {
        new: true,
      }
    ).lean();
  }

  // Update Payment Status
  async updatePaymentStatus(
    orderId,
    tenantId,
    paymentStatus
  ) {
    return await Order.findOneAndUpdate(
      {
        _id: orderId,
        tenantId,
        isDeleted: false,
      },
      {
        paymentStatus,
      },
      {
        new: true,
      }
    ).lean();
  }

  // Soft Delete
  async deleteOrder(orderId, tenantId) {
    return await Order.findOneAndUpdate(
      {
        _id: orderId,
        tenantId,
        isDeleted: false,
      },
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    ).lean();
  }

  // Count Today's Orders
  async getTodayOrderCount(
    tenantId,
    startOfDay,
    endOfDay
  ) {
    return await Order.countDocuments({
      tenantId,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      isDeleted: false,
    });
  }

  // Dashboard Statistics
  async getDashboardStats(tenantId) {
    return await Order.aggregate([
      {
        $match: {
          tenantId,
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: null,
          totalOrders: {
            $sum: 1,
          },
          totalRevenue: {
            $sum: "$grandTotal",
          },
          totalDiscount: {
            $sum: "$discount",
          },
          totalTax: {
            $sum: "$tax",
          },
        },
      },
    ]);
  }
}

export default new OrderRepository();