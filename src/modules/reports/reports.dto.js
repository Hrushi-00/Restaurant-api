class ReportsDTO {
  salesResponse(data) {
    return {
      totalOrders: data.totalOrders || 0,
      totalSales: data.totalSales || 0,
      totalDiscount: data.totalDiscount || 0,
      totalTax: data.totalTax || 0,
    };
  }

  purchaseResponse(data) {
    return {
      totalPurchases: data.totalPurchases || 0,
      totalPurchaseAmount:
        data.totalPurchaseAmount || 0,
      totalPaidAmount:
        data.totalPaidAmount || 0,
      totalPendingAmount:
        data.totalPendingAmount || 0,
    };
  }

  inventoryResponse(data) {
    return {
      totalItems: data.totalItems || 0,
      totalStockValue:
        data.totalStockValue || 0,
      lowStockItems:
        data.lowStockItems || 0,
    };
  }

  stockMovementResponse(data) {
    return data.map((item) => ({
      movementType: item._id,
      totalQuantity:
        item.totalQuantity || 0,
      totalMovements:
        item.totalMovements || 0,
    }));
  }

  paymentResponse(data) {
    return data.map((item) => ({
      paymentMethod: item._id,
      totalAmount:
        item.totalAmount || 0,
      totalTransactions:
        item.totalTransactions || 0,
    }));
  }

  orderResponse(data) {
    return data.map((item) => ({
      orderStatus: item._id,
      totalOrders:
        item.totalOrders || 0,
      totalAmount:
        item.totalAmount || 0,
    }));
  }

  dashboardResponse(data) {
    return {
      sales: this.salesResponse(
        data.sales
      ),

      purchases: this.purchaseResponse(
        data.purchases
      ),

      inventory: this.inventoryResponse(
        data.inventory
      ),

      pendingOrders:
        data.pendingOrders || 0,
    };
  }
}

export default new ReportsDTO();