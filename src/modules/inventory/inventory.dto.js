class InventoryDTO {
  inventoryResponse(inventory) {
    if (!inventory) return null;

    return {
      id: inventory._id,

      tenantId: inventory.tenantId,

      itemCode: inventory.itemCode,

      itemName: inventory.itemName,

      category: inventory.category,

      supplierId: inventory.supplierId,

      unit: inventory.unit,

      openingStock: inventory.openingStock,

      currentStock: inventory.currentStock,

      minimumStock: inventory.minimumStock,

      maximumStock: inventory.maximumStock,

      purchasePrice: inventory.purchasePrice,

      sellingPrice: inventory.sellingPrice,

      stockValue:
        Number(inventory.currentStock) *
        Number(inventory.purchasePrice),

      expiryDate: inventory.expiryDate,

      lastStockInAt: inventory.lastStockInAt,

      lastStockOutAt: inventory.lastStockOutAt,

      isLowStock: inventory.currentStock <= inventory.minimumStock,

      status: inventory.status,

      notes: inventory.notes,

      createdAt: inventory.createdAt,

      updatedAt: inventory.updatedAt,
    };
  }

  inventoryListResponse(result) {
    return {
      items: result.items.map((item) =>
        this.inventoryResponse(item)
      ),

      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
    };
  }

  lowStockResponse(items) {
    return items.map((item) => ({
      id: item._id,

      itemCode: item.itemCode,

      itemName: item.itemName,

      category: item.category,

      unit: item.unit,

      currentStock: item.currentStock,

      minimumStock: item.minimumStock,

      shortage:
        item.minimumStock - item.currentStock,

      status: item.status,
    }));
  }

  expiringItemsResponse(items) {
    return items.map((item) => ({
      id: item._id,

      itemCode: item.itemCode,

      itemName: item.itemName,

      category: item.category,

      expiryDate: item.expiryDate,

      currentStock: item.currentStock,

      unit: item.unit,
    }));
  }

  stockTransactionResponse(inventory, action) {
    return {
      action,

      inventory: this.inventoryResponse(inventory),
    };
  }
}

export default new InventoryDTO();