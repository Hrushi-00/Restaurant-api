// src/modules/order/order.dto.js

export const orderResponse = (order) => {
  if (!order) return null;

  return {
    id: order._id,

    tenantId: order.tenantId,

    orderNumber: order.orderNumber,

    customerName: order.customerName,

    customerPhone: order.customerPhone,

    orderType: order.orderType,

    items: order.items.map((item) => ({
      menuId: item.menuId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      total: item.total,
    })),

    subtotal: order.subtotal,

    discount: order.discount,

    tax: order.tax,

    grandTotal: order.grandTotal,

    paymentStatus: order.paymentStatus,

    paymentMethod: order.paymentMethod,

    orderStatus: order.orderStatus,

    notes: order.notes,

    createdAt: order.createdAt,

    updatedAt: order.updatedAt,
  };
};

export const orderListResponse = (orders = []) => {
  return orders.map(orderResponse);
};