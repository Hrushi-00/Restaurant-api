class PurchaseDTO {
  purchaseResponse(purchase) {
    if (!purchase) return null;

    return {
      id: purchase._id,

      tenantId: purchase.tenantId,

      purchaseNumber: purchase.purchaseNumber,

      supplier: purchase.supplierId
        ? {
            id: purchase.supplierId._id,
            supplierCode:
              purchase.supplierId.supplierCode,
            supplierName:
              purchase.supplierId.supplierName,
            contactPerson:
              purchase.supplierId.contactPerson,
            phone: purchase.supplierId.phone,
            email: purchase.supplierId.email,
            gstNumber:
              purchase.supplierId.gstNumber,
          }
        : null,

      items: purchase.items.map((item) => ({
        inventoryId: item.inventoryId?._id || item.inventoryId,
        itemName: item.itemName,
        quantity: item.quantity,
        unit: item.unit,
        purchasePrice: item.purchasePrice,
        tax: item.tax,
        discount: item.discount,
        total: item.total,
      })),

      subtotal: purchase.subtotal,

      discount: purchase.discount,

      tax: purchase.tax,

      shippingCharge:
        purchase.shippingCharge,

      grandTotal: purchase.grandTotal,

      paymentMethod:
        purchase.paymentMethod,

      paymentStatus:
        purchase.paymentStatus,

      paidAmount: purchase.paidAmount,

      pendingAmount:
        Math.max(
          purchase.grandTotal -
            purchase.paidAmount,
          0
        ),

      purchaseStatus:
        purchase.purchaseStatus,

      purchaseDate:
        purchase.purchaseDate,

      expectedDeliveryDate:
        purchase.expectedDeliveryDate,

      receivedAt:
        purchase.receivedAt,

      invoiceNumber:
        purchase.invoiceNumber,

      notes: purchase.notes,

      createdAt: purchase.createdAt,

      updatedAt: purchase.updatedAt,
    };
  }

  purchaseListResponse(result) {
    return {
      items: result.items.map((purchase) =>
        this.purchaseResponse(purchase)
      ),

      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
    };
  }

  purchaseSummaryResponse(data) {
    return {
      totalPurchases:
        data.totalPurchases,

      totalPurchaseAmount:
        data.totalPurchaseAmount,

      totalPaidAmount:
        data.totalPaidAmount,

      totalPendingAmount:
        data.totalPendingAmount,
    };
  }
}

export default new PurchaseDTO();