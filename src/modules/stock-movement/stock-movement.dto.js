class StockMovementDTO {
  stockMovementResponse(movement) {
    if (!movement) return null;

    return {
      id: movement._id,

      tenantId: movement.tenantId,

      inventory: movement.inventoryId
        ? {
            id: movement.inventoryId._id,
            itemCode: movement.inventoryId.itemCode,
            itemName: movement.inventoryId.itemName,
            category: movement.inventoryId.category,
            unit: movement.inventoryId.unit,
            currentStock:
              movement.inventoryId.currentStock,
          }
        : null,

      movementType: movement.movementType,

      quantity: movement.quantity,

      previousStock: movement.previousStock,

      newStock: movement.newStock,

      reference: {
        type: movement.referenceType,
        id: movement.referenceId,
      },

      reason: movement.reason,

      performedBy: movement.performedBy
        ? {
            id: movement.performedBy._id,
            name: movement.performedBy.name,
            email: movement.performedBy.email,
            role: movement.performedBy.role,
          }
        : null,

      notes: movement.notes,

      createdAt: movement.createdAt,

      updatedAt: movement.updatedAt,
    };
  }

  stockMovementListResponse(result) {
    return {
      items: result.items.map((movement) =>
        this.stockMovementResponse(movement)
      ),

      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
    };
  }

  inventoryMovementListResponse(result) {
    return {
      items: result.items.map((movement) =>
        this.stockMovementResponse(movement)
      ),

      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
    };
  }
}

export default new StockMovementDTO();