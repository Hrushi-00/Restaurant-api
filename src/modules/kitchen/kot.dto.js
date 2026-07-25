export const kotResponse = (kot) => {
  if (!kot) return null;

  return {
    id: kot._id,

    tenantId: kot.tenantId,

    orderId: kot.orderId?._id || kot.orderId,

    table: kot.tableId
      ? {
          id: kot.tableId._id,
          tableNumber: kot.tableId.tableNumber,
          tableName: kot.tableId.tableName,
        }
      : null,

    tokenNumber: kot.tokenNumber,

    priority: kot.priority,

    status: kot.status,

    chef: kot.chefId
      ? {
          id: kot.chefId._id,
          name: kot.chefId.name,
          email: kot.chefId.email,
        }
      : null,

    estimatedTime: kot.estimatedTime,

    startedAt: kot.startedAt,

    completedAt: kot.completedAt,

    notes: kot.notes,

    items: kot.items.map((item) => ({
      menuItemId: item.menuItemId,
      name: item.name,
      quantity: item.quantity,
      station: item.station,
      status: item.status,
      notes: item.notes,
    })),

    createdAt: kot.createdAt,

    updatedAt: kot.updatedAt,
  };
};

export const kotListResponse = (kots) => {
  return kots.map((kot) => kotResponse(kot));
};