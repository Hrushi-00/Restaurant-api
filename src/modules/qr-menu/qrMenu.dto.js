export const qrMenuResponse = (qrMenu) => {
  if (!qrMenu) return null;

  return {
    id: qrMenu._id,

    tenantId: qrMenu.tenantId,

    table: qrMenu.tableId
      ? {
          id: qrMenu.tableId._id,
          tableNumber: qrMenu.tableId.tableNumber,
          tableName: qrMenu.tableId.tableName,
          capacity: qrMenu.tableId.capacity,
        }
      : null,

    qrCode: qrMenu.qrCode,

    qrUrl: qrMenu.qrUrl,

    status: qrMenu.status,

    scanCount: qrMenu.scanCount,

    lastScannedAt: qrMenu.lastScannedAt,

    createdAt: qrMenu.createdAt,

    updatedAt: qrMenu.updatedAt,
  };
};

export const qrMenuListResponse = (qrMenus) => {
  return qrMenus.map((qrMenu) =>
    qrMenuResponse(qrMenu)
  );
};