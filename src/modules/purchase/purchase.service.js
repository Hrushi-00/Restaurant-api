import PurchaseRepository from "./purchase.repository.js";
import PurchaseDTO from "./purchase.dto.js";

import SupplierRepository from "../supplier/supplier.repository.js";
import InventoryRepository from "../inventory/inventory.repository.js";

import ApiError from "../../utils/ApiError.js";

class PurchaseService {
  resolveTenantId(user) {
    if (user.tenantId) {
      return user.tenantId;
    }

    if (user.restaurantId) {
      return user.restaurantId;
    }

    throw new ApiError(
      400,
      "Tenant ID not found."
    );
  }

  async generatePurchaseNumber(tenantId) {
    const year = new Date().getFullYear();

    const count =
      await PurchaseRepository.countByTenant(
        tenantId
      );

    const sequence = String(count + 1).padStart(
      4,
      "0"
    );

    return `PUR-${year}-${sequence}`;
  }

  async validateSupplier(
    tenantId,
    supplierId
  ) {
    const supplier =
      await SupplierRepository.findById(
        supplierId
      );

    if (
      !supplier ||
      String(supplier.tenantId) !==
        String(tenantId)
    ) {
      throw new ApiError(
        404,
        "Supplier not found."
      );
    }

    if (supplier.status !== "ACTIVE") {
      throw new ApiError(
        400,
        "Supplier is inactive."
      );
    }

    return supplier;
  }

  async calculateItems(items, tenantId) {
    const processedItems = [];

    let subtotal = 0;

    for (const item of items) {
      const inventory =
        await InventoryRepository.findById(
          item.inventoryId
        );

      if (
        !inventory ||
        String(inventory.tenantId) !==
          String(tenantId)
      ) {
        throw new ApiError(
          404,
          `Inventory item not found: ${item.inventoryId}`
        );
      }

      const quantity = Number(
        item.quantity
      );

      const purchasePrice = Number(
        item.purchasePrice
      );

      const tax = Number(item.tax || 0);

      const discount = Number(
        item.discount || 0
      );

      const baseAmount =
        quantity * purchasePrice;

      const total = Math.max(
        baseAmount + tax - discount,
        0
      );

      subtotal += total;

      processedItems.push({
        inventoryId: inventory._id,
        itemName: inventory.itemName,
        quantity,
        unit: inventory.unit,
        purchasePrice,
        tax,
        discount,
        total,
      });
    }

    return {
      items: processedItems,
      subtotal,
    };
  }

  calculatePaymentStatus(
    grandTotal,
    paidAmount
  ) {
    if (paidAmount <= 0) {
      return "UNPAID";
    }

    if (paidAmount >= grandTotal) {
      return "PAID";
    }

    return "PARTIALLY_PAID";
  }

  async createPurchase(user, payload) {
    const tenantId =
      this.resolveTenantId(user);

    await this.validateSupplier(
      tenantId,
      payload.supplierId
    );

    const {
      items,
      subtotal,
    } = await this.calculateItems(
      payload.items,
      tenantId
    );

    const discount = Number(
      payload.discount || 0
    );

    const tax = Number(
      payload.tax || 0
    );

    const shippingCharge = Number(
      payload.shippingCharge || 0
    );

    const grandTotal = Math.max(
      subtotal -
        discount +
        tax +
        shippingCharge,
      0
    );

    const paidAmount = Math.min(
      Number(payload.paidAmount || 0),
      grandTotal
    );

    const paymentStatus =
      this.calculatePaymentStatus(
        grandTotal,
        paidAmount
      );

    const purchaseNumber =
      await this.generatePurchaseNumber(
        tenantId
      );

    const purchase =
      await PurchaseRepository.create({
        tenantId,
        purchaseNumber,
        supplierId: payload.supplierId,
        items,
        subtotal,
        discount,
        tax,
        shippingCharge,
        grandTotal,
        paymentMethod:
          payload.paymentMethod || "CREDIT",
        paymentStatus,
        paidAmount,
        purchaseStatus: "DRAFT",
        purchaseDate:
          payload.purchaseDate || new Date(),
        expectedDeliveryDate:
          payload.expectedDeliveryDate ||
          null,
        invoiceNumber:
          payload.invoiceNumber || null,
        notes: payload.notes || "",
      });

    return PurchaseDTO.purchaseResponse(
      purchase
    );
  }

  async getAllPurchases(user, query) {
    const tenantId =
      this.resolveTenantId(user);

    const purchases =
      await PurchaseRepository.findAllByTenant(
        tenantId,
        query
      );

    return PurchaseDTO.purchaseListResponse(
      purchases
    );
  }

  async getPurchaseById(user, id) {
    const tenantId =
      this.resolveTenantId(user);

    const purchase =
      await PurchaseRepository.findById(id);

    if (
      !purchase ||
      String(purchase.tenantId) !==
        String(tenantId)
    ) {
      throw new ApiError(
        404,
        "Purchase not found."
      );
    }

    return PurchaseDTO.purchaseResponse(
      purchase
    );
  }

  async updatePurchase(
    user,
    id,
    payload
  ) {
    const tenantId =
      this.resolveTenantId(user);

    const purchase =
      await PurchaseRepository.findById(id);

    if (
      !purchase ||
      String(purchase.tenantId) !==
        String(tenantId)
    ) {
      throw new ApiError(
        404,
        "Purchase not found."
      );
    }

    if (
      ["RECEIVED", "CANCELLED"].includes(
        purchase.purchaseStatus
      )
    ) {
      throw new ApiError(
        400,
        `Cannot update a ${purchase.purchaseStatus.toLowerCase()} purchase.`
      );
    }

    if (payload.supplierId) {
      await this.validateSupplier(
        tenantId,
        payload.supplierId
      );
    }

    const updated =
      await PurchaseRepository.update(
        id,
        payload
      );

    return PurchaseDTO.purchaseResponse(
      updated
    );
  }

  async receivePurchase(user, id) {
    const tenantId =
      this.resolveTenantId(user);

    const purchase =
      await PurchaseRepository.findById(id);

    if (
      !purchase ||
      String(purchase.tenantId) !==
        String(tenantId)
    ) {
      throw new ApiError(
        404,
        "Purchase not found."
      );
    }

    if (
      purchase.purchaseStatus ===
      "RECEIVED"
    ) {
      throw new ApiError(
        400,
        "Purchase has already been received."
      );
    }

    if (
      purchase.purchaseStatus ===
      "CANCELLED"
    ) {
      throw new ApiError(
        400,
        "Cancelled purchase cannot be received."
      );
    }

    for (const item of purchase.items) {
      const inventory =
        await InventoryRepository.findById(
          item.inventoryId
        );

      if (
        !inventory ||
        String(inventory.tenantId) !==
          String(tenantId)
      ) {
        throw new ApiError(
          404,
          `Inventory item not found: ${item.itemName}`
        );
      }

      await InventoryRepository.stockIn(
        item.inventoryId,
        item.quantity
      );
    }

    const received =
      await PurchaseRepository.markAsReceived(
        id
      );

    return PurchaseDTO.purchaseResponse(
      received
    );
  }

  async cancelPurchase(user, id) {
    const tenantId =
      this.resolveTenantId(user);

    const purchase =
      await PurchaseRepository.findById(id);

    if (
      !purchase ||
      String(purchase.tenantId) !==
        String(tenantId)
    ) {
      throw new ApiError(
        404,
        "Purchase not found."
      );
    }

    if (
      purchase.purchaseStatus ===
      "RECEIVED"
    ) {
      throw new ApiError(
        400,
        "Received purchase cannot be cancelled."
      );
    }

    if (
      purchase.purchaseStatus ===
      "CANCELLED"
    ) {
      throw new ApiError(
        400,
        "Purchase is already cancelled."
      );
    }

    const cancelled =
      await PurchaseRepository.markAsCancelled(
        id
      );

    return PurchaseDTO.purchaseResponse(
      cancelled
    );
  }

  async deletePurchase(user, id) {
    const tenantId =
      this.resolveTenantId(user);

    const purchase =
      await PurchaseRepository.findById(id);

    if (
      !purchase ||
      String(purchase.tenantId) !==
        String(tenantId)
    ) {
      throw new ApiError(
        404,
        "Purchase not found."
      );
    }

    if (
      purchase.purchaseStatus ===
      "RECEIVED"
    ) {
      throw new ApiError(
        400,
        "Received purchase cannot be deleted."
      );
    }

    await PurchaseRepository.softDelete(id);

    return null;
  }
}

export default new PurchaseService();