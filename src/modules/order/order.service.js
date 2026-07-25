import OrderRepository from "./order.repository.js";
import RestaurantRepository from "../restaurant/restaurant.repository.js";
import MenuRepository from "../menu/menu.repository.js";
import { orderResponse } from "./order.dto.js";
import ApiError from "../../utils/ApiError.js";

class OrderService {
  // Resolve Tenant
  async resolveTenantId(user) {
    if (user.tenantId) {
      return user.tenantId;
    }

    const restaurant = await RestaurantRepository.findByOwnerId(
      user.id
    );

    if (!restaurant) {
      throw new ApiError(404, "Restaurant not found");
    }

    return restaurant._id;
  }

  // Generate Order Number
  async generateOrderNumber(tenantId) {
    const today = new Date();

    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const count =
      await OrderRepository.getTodayOrderCount(
        tenantId,
        startOfDay,
        endOfDay
      );

    const date =
      today.getFullYear().toString() +
      String(today.getMonth() + 1).padStart(2, "0") +
      String(today.getDate()).padStart(2, "0");

    return `ORD-${date}-${String(count + 1).padStart(4, "0")}`;
  }

  // Calculate Order Items
  async prepareOrderItems(items, tenantId) {
    let subtotal = 0;

    const orderItems = [];

    for (const item of items) {
      const menu = await MenuRepository.findById(
        item.menuId,
        tenantId
      );

      if (!menu) {
        throw new ApiError(
          404,
          `Menu not found : ${item.menuId}`
        );
      }

      if (!menu.isAvailable) {
        throw new ApiError(
          400,
          `${menu.name} is unavailable`
        );
      }

      const price =
        menu.discountPrice > 0
          ? menu.discountPrice
          : menu.price;

      const total = price * item.quantity;

      subtotal += total;

      orderItems.push({
        menuId: menu._id,
        name: menu.name,
        price,
        quantity: item.quantity,
        total,
      });
    }

    return {
      subtotal,
      orderItems,
    };
  }

  // Create Order
  async createOrder(user, orderData) {
    const tenantId = await this.resolveTenantId(user);

    const orderNumber =
      await this.generateOrderNumber(tenantId);

    const { subtotal, orderItems } =
      await this.prepareOrderItems(
        orderData.items,
        tenantId
      );

    const discount = orderData.discount || 0;

    const taxableAmount = subtotal - discount;

    const tax = Number((taxableAmount * 0.05).toFixed(2));

    const grandTotal = taxableAmount + tax;

    const order =
      await OrderRepository.createOrder({
        tenantId,
        orderNumber,

        customerName:
          orderData.customerName ||
          "Walk-in Customer",

        customerPhone:
          orderData.customerPhone || "",

        orderType: orderData.orderType,

        items: orderItems,

        subtotal,
        discount,
        tax,
        grandTotal,

        paymentMethod:
          orderData.paymentMethod,

        notes: orderData.notes,
      });

    const createdOrder =
      await OrderRepository.findById(
        order._id,
        tenantId
      );

    return orderResponse(createdOrder);
  }

  // Get All Orders
  async getAllOrders(user) {
    const tenantId = await this.resolveTenantId(user);

    const orders =
      await OrderRepository.findAllByTenant(
        tenantId
      );

    return orders.map(orderResponse);
  }

  // Get Order By ID
  async getOrderById(user, orderId) {
    const tenantId = await this.resolveTenantId(user);

    const order =
      await OrderRepository.findById(
        orderId,
        tenantId
      );

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    return orderResponse(order);
  }

  // Update Order
async updateOrder(user, orderId, updateData) {
  const tenantId = await this.resolveTenantId(user);

  const existingOrder = await OrderRepository.findById(
    orderId,
    tenantId
  );

  if (!existingOrder) {
    throw new ApiError(404, "Order not found");
  }

  let orderItems = existingOrder.items;
  let subtotal = existingOrder.subtotal;
  let discount =
    updateData.discount !== undefined
      ? updateData.discount
      : existingOrder.discount;

  // Recalculate items if updated
  if (updateData.items) {
    const preparedItems = await this.prepareOrderItems(
      updateData.items,
      tenantId
    );

    orderItems = preparedItems.orderItems;
    subtotal = preparedItems.subtotal;
  }

  const taxableAmount = subtotal - discount;

  const tax = Number(
    (taxableAmount * 0.05).toFixed(2)
  );

  const grandTotal = taxableAmount + tax;

  const order = await OrderRepository.updateOrder(
    orderId,
    tenantId,
    {
      customerName:
        updateData.customerName ??
        existingOrder.customerName,

      customerPhone:
        updateData.customerPhone ??
        existingOrder.customerPhone,

      orderType:
        updateData.orderType ??
        existingOrder.orderType,

      paymentMethod:
        updateData.paymentMethod ??
        existingOrder.paymentMethod,

      notes:
        updateData.notes ??
        existingOrder.notes,

      items: orderItems,
      subtotal,
      discount,
      tax,
      grandTotal,
    }
  );

  return orderResponse(order);
}

  // Update Order Status
  async updateOrderStatus(
    user,
    orderId,
    orderStatus
  ) {
    const tenantId = await this.resolveTenantId(user);

    const order =
      await OrderRepository.updateOrderStatus(
        orderId,
        tenantId,
        orderStatus
      );

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    return orderResponse(order);
  }

  // Update Payment Status
  async updatePaymentStatus(
    user,
    orderId,
    paymentStatus
  ) {
    const tenantId = await this.resolveTenantId(user);

    const order =
      await OrderRepository.updatePaymentStatus(
        orderId,
        tenantId,
        paymentStatus
      );

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    return orderResponse(order);
  }

  // Delete Order
  async deleteOrder(user, orderId) {
    const tenantId = await this.resolveTenantId(user);

    const order =
      await OrderRepository.deleteOrder(
        orderId,
        tenantId
      );

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    return null;
  }
}

export default new OrderService();