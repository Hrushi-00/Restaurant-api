import InventoryRepository from "./inventory.repository.js";
import InventoryDTO from "./inventory.dto.js";
import ApiError from "../../utils/ApiError.js";

class InventoryService {
  resolveTenantId(user) {
    return user.tenantId || user.restaurantId || user.id;
  }

  async createInventory(user, payload) {
    const tenantId = this.resolveTenantId(user);

    const exists = await InventoryRepository.findByItemCode(
      tenantId,
      payload.itemCode
    );

    if (exists) {
      throw new ApiError(409, "Item code already exists.");
    }

    const inventory = await InventoryRepository.create({
      tenantId,
      ...payload,
      currentStock:
        payload.currentStock ?? payload.openingStock ?? 0,
    });

    return InventoryDTO.inventoryResponse(inventory);
  }

  async getAllInventories(user, query) {
    const tenantId = this.resolveTenantId(user);

    const inventories =
      await InventoryRepository.findAllByTenant(
        tenantId,
        query
      );

    return InventoryDTO.inventoryListResponse(inventories);
  }

  async getInventoryById(user, id) {
    const tenantId = this.resolveTenantId(user);

    const inventory =
      await InventoryRepository.findById(id);

    if (
      !inventory ||
      inventory.tenantId.toString() !== tenantId.toString()
    ) {
      throw new ApiError(404, "Inventory not found.");
    }

    return InventoryDTO.inventoryResponse(inventory);
  }

  async updateInventory(user, id, payload) {
    const tenantId = this.resolveTenantId(user);

    const inventory =
      await InventoryRepository.findById(id);

    if (
      !inventory ||
      inventory.tenantId.toString() !== tenantId.toString()
    ) {
      throw new ApiError(404, "Inventory not found.");
    }

    if (
      payload.itemCode &&
      payload.itemCode !== inventory.itemCode
    ) {
      const duplicate =
        await InventoryRepository.findByItemCode(
          tenantId,
          payload.itemCode
        );

      if (duplicate) {
        throw new ApiError(
          409,
          "Item code already exists."
        );
      }
    }

    const updated =
      await InventoryRepository.update(id, payload);

    return InventoryDTO.inventoryResponse(updated);
  }

  async stockIn(user, id, quantity) {
    const tenantId = this.resolveTenantId(user);

    const inventory =
      await InventoryRepository.findById(id);

    if (
      !inventory ||
      inventory.tenantId.toString() !== tenantId.toString()
    ) {
      throw new ApiError(404, "Inventory not found.");
    }

    const updated =
      await InventoryRepository.stockIn(
        id,
        Number(quantity)
      );

    return InventoryDTO.stockTransactionResponse(
      updated,
      "STOCK_IN"
    );
  }

  async stockOut(user, id, quantity) {
    const tenantId = this.resolveTenantId(user);

    const inventory =
      await InventoryRepository.findById(id);

    if (
      !inventory ||
      inventory.tenantId.toString() !== tenantId.toString()
    ) {
      throw new ApiError(404, "Inventory not found.");
    }

    if (
      inventory.currentStock < Number(quantity)
    ) {
      throw new ApiError(
        400,
        "Insufficient stock."
      );
    }

    const updated =
      await InventoryRepository.stockOut(
        id,
        Number(quantity)
      );

    return InventoryDTO.stockTransactionResponse(
      updated,
      "STOCK_OUT"
    );
  }

  async adjustStock(user, id, quantity) {
    const tenantId = this.resolveTenantId(user);

    const inventory =
      await InventoryRepository.findById(id);

    if (
      !inventory ||
      inventory.tenantId.toString() !== tenantId.toString()
    ) {
      throw new ApiError(404, "Inventory not found.");
    }

    if (quantity < 0) {
      throw new ApiError(
        400,
        "Stock cannot be negative."
      );
    }

    const updated =
      await InventoryRepository.adjustStock(
        id,
        Number(quantity)
      );

    return InventoryDTO.stockTransactionResponse(
      updated,
      "STOCK_ADJUSTMENT"
    );
  }

  async getLowStockItems(user) {
    const tenantId = this.resolveTenantId(user);

    const items =
      await InventoryRepository.getLowStockItems(
        tenantId
      );

    return InventoryDTO.lowStockResponse(items);
  }

  async getExpiringItems(user, days = 30) {
    const tenantId = this.resolveTenantId(user);

    const expiryDate = new Date();
    expiryDate.setDate(
      expiryDate.getDate() + Number(days)
    );

    const items =
      await InventoryRepository.getExpiringItems(
        tenantId,
        expiryDate
      );

    return InventoryDTO.expiringItemsResponse(items);
  }

  async deleteInventory(user, id) {
    const tenantId = this.resolveTenantId(user);

    const inventory =
      await InventoryRepository.findById(id);

    if (
      !inventory ||
      inventory.tenantId.toString() !== tenantId.toString()
    ) {
      throw new ApiError(404, "Inventory not found.");
    }

    await InventoryRepository.softDelete(id);

    return {
      message: "Inventory deleted successfully.",
    };
  }
}

export default new InventoryService();