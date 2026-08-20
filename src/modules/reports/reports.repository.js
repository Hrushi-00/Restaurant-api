import Order from "../order/order.model.js";
import Purchase from "../purchase/purchase.model.js";
import Inventory from "../inventory/inventory.model.js";
import StockMovement from "../stock-movement/stock-movement.model.js";
import Payment from "../payment/payment.model.js";

class ReportsRepository {
  getDateFilter(fromDate, toDate, field = "createdAt") {
    const filter = {};

    if (fromDate || toDate) {
      filter[field] = {};

      if (fromDate) {
        filter[field].$gte = new Date(fromDate);
      }

      if (toDate) {
        const endDate = new Date(toDate);

        endDate.setHours(
          23,
          59,
          59,
          999
        );

        filter[field].$lte = endDate;
      }
    }

    return filter;
  }

  async getSalesReport(
    tenantId,
    fromDate,
    toDate
  ) {
    const dateFilter = this.getDateFilter(
      fromDate,
      toDate,
      "createdAt"
    );

    const result = await Order.aggregate([
      {
        $match: {
          tenantId,
          isDeleted: false,
          ...dateFilter,
          orderStatus: {
            $nin: ["CANCELLED"],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalOrders: {
            $sum: 1,
          },
          totalSales: {
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

    return (
      result[0] || {
        totalOrders: 0,
        totalSales: 0,
        totalDiscount: 0,
        totalTax: 0,
      }
    );
  }

  async getPurchaseReport(
    tenantId,
    fromDate,
    toDate
  ) {
    const dateFilter = this.getDateFilter(
      fromDate,
      toDate,
      "purchaseDate"
    );

    const result =
      await Purchase.aggregate([
        {
          $match: {
            tenantId,
            isDeleted: false,
            purchaseStatus: "RECEIVED",
            ...dateFilter,
          },
        },
        {
          $group: {
            _id: null,
            totalPurchases: {
              $sum: 1,
            },
            totalPurchaseAmount: {
              $sum: "$grandTotal",
            },
            totalPaidAmount: {
              $sum: "$paidAmount",
            },
          },
        },
      ]);

    const data =
      result[0] || {
        totalPurchases: 0,
        totalPurchaseAmount: 0,
        totalPaidAmount: 0,
      };

    data.totalPendingAmount = Math.max(
      data.totalPurchaseAmount -
        data.totalPaidAmount,
      0
    );

    return data;
  }

  async getInventoryReport(tenantId) {
    const result =
      await Inventory.aggregate([
        {
          $match: {
            tenantId,
            isDeleted: false,
          },
        },
        {
          $group: {
            _id: null,
            totalItems: {
              $sum: 1,
            },
            totalStockValue: {
              $sum: {
                $multiply: [
                  "$currentStock",
                  "$purchasePrice",
                ],
              },
            },
            lowStockItems: {
              $sum: {
                $cond: [
                  {
                    $lte: [
                      "$currentStock",
                      "$minimumStock",
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
      ]);

    return (
      result[0] || {
        totalItems: 0,
        totalStockValue: 0,
        lowStockItems: 0,
      }
    );
  }

  async getStockMovementReport(
    tenantId,
    fromDate,
    toDate
  ) {
    const dateFilter = this.getDateFilter(
      fromDate,
      toDate,
      "createdAt"
    );

    return StockMovement.aggregate([
      {
        $match: {
          tenantId,
          ...dateFilter,
        },
      },
      {
        $group: {
          _id: "$movementType",
          totalQuantity: {
            $sum: "$quantity",
          },
          totalMovements: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          totalQuantity: -1,
        },
      },
    ]);
  }

  async getPaymentReport(
    tenantId,
    fromDate,
    toDate
  ) {
    const dateFilter = this.getDateFilter(
      fromDate,
      toDate,
      "createdAt"
    );

    const result =
      await Payment.aggregate([
        {
          $match: {
            tenantId,
            ...dateFilter,
          },
        },
        {
          $group: {
            _id: "$paymentMethod",
            totalAmount: {
              $sum: "$amount",
            },
            totalTransactions: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            totalAmount: -1,
          },
        },
      ]);

    return result;
  }

  async getOrderReport(
    tenantId,
    fromDate,
    toDate
  ) {
    const dateFilter = this.getDateFilter(
      fromDate,
      toDate,
      "createdAt"
    );

    return Order.aggregate([
      {
        $match: {
          tenantId,
          isDeleted: false,
          ...dateFilter,
        },
      },
      {
        $group: {
          _id: "$orderStatus",
          totalOrders: {
            $sum: 1,
          },
          totalAmount: {
            $sum: "$grandTotal",
          },
        },
      },
      {
        $sort: {
          totalOrders: -1,
        },
      },
    ]);
  }

  async getDashboard(tenantId) {
    const [
      sales,
      purchases,
      inventory,
      pendingOrders,
    ] = await Promise.all([
      this.getSalesReport(
        tenantId,
        new Date(),
        new Date()
      ),

      this.getPurchaseReport(
        tenantId,
        new Date(),
        new Date()
      ),

      this.getInventoryReport(
        tenantId
      ),

      Order.countDocuments({
        tenantId,
        isDeleted: false,
        orderStatus: {
          $nin: [
            "COMPLETED",
            "CANCELLED",
          ],
        },
      }),
    ]);

    return {
      sales,
      purchases,
      inventory,
      pendingOrders,
    };
  }
}

export default new ReportsRepository();