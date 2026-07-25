

export const tableResponse = (table) => {
  if (!table) return null;

  return {
    id: table._id,

    tenantId: table.tenantId,

    tableNumber: table.tableNumber,

    tableName: table.tableName,

    capacity: table.capacity,

    section: table.section,

    status: table.status,

    qrCode: table.qrCode,

    isActive: table.isActive,

    createdAt: table.createdAt,

    updatedAt: table.updatedAt,
  };
};

export const tableListResponse = (tables = []) => {
  return tables.map(tableResponse);
};