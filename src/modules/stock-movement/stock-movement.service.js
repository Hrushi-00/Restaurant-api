import StockMovementRepository from "./stock-movement.repository.js";
import StockMovementDTO from "./stock-movement.dto.js";

import InventoryRepository from "../inventory/inventory.repository.js";

import ApiError from "../../utils/ApiError.js";

class StockMovementService {
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

  async createMovement(user, payload) {
    const tenantId =
      this.resolveTenantId(user);

    const inventory =
      await InventoryRepository.findById(
        payload.inventoryId
      );

    if (
      !inventory ||
      String(inventory.tenantId) !==
        String(tenantId)
    ) {
      throw new ApiError(
        404,
        "Inventory not found."
      );
    }

    const quantity = Number(
      payload.quantity
    );

    const incomingTypes = [
      "PURCHASE_IN",
      "MANUAL_IN",
      "RETURN_IN",
    ];

    const outgoingTypes = [
      "SALE_OUT",
      "MANUAL_OUT",
      "RETURN_OUT",
      "WASTAGE",
    ];

    let newStock =
      Number(inventory.currentStock);

    if (incomingTypes.includes(
      payload.movementType
    )) {
      newStock += quantity;
    }

    if (outgoingTypes.includes(
      payload.movementType
    )) {
      if (
        Number(inventory.currentStock) <
        quantity
      ) {
        throw new ApiError(
          400,
          "Insufficient stock."
        );
      }

      newStock -= quantity;
    }

    if (
      payload.movementType ===
      "ADJUSTMENT"
    ) {
      if (payload.newStock === undefined) {
        throw new ApiError(
          400,
          "New stock is required for adjustment."
        );
      }

      newStock = Number(
        payload.newStock
      );

      if (newStock < 0) {
        throw new ApiError(
          400,
          "Stock cannot be negative."
        );
      }
    }

    const previousStock =
      Number(inventory.currentStock);

    const movement =
      await StockMovementRepository.create({
        tenantId,
        inventoryId:
          inventory._id,
        movementType:
          payload.movementType,
        quantity,
        previousStock,
        newStock,
        referenceType:
          payload.referenceType ||
          "MANUAL",
        referenceId:
          payload.referenceId ||
          null,
        reason:
          payload.reason || "",
        performedBy: user.id,
        notes:
          payload.notes || "",
      });

    await InventoryRepository.adjustStock(
      inventory._id,
      newStock
    );

    const createdMovement =
      await StockMovementRepository.findById(
        movement._id
      );

    return StockMovementDTO.stockMovementResponse(
      createdMovement
    );
  }

  async getAllMovements(user, query) {
    const tenantId =
      this.resolveTenantId(user);

    const result =
      await StockMovementRepository.findAllByTenant(
        tenantId,
        query
      );

    return StockMovementDTO.stockMovementListResponse(
      result
    );
  }

  async getMovementById(user, id) {
    const tenantId =
      this.resolveTenantId(user);

    const movement =
      await StockMovementRepository.findById(
        id
      );

    if (
      !movement ||
      String(movement.tenantId) !==
        String(tenantId)
    ) {
      throw new ApiError(
        404,
        "Stock movement not found."
      );
    }

    return StockMovementDTO.stockMovementResponse(
      movement
    );
  }

  async getInventoryMovements(
    user,
    inventoryId,
    query
  ) {
    const tenantId =
      this.resolveTenantId(user);

    const inventory =
      await InventoryRepository.findById(
        inventoryId
      );

    if (
      !inventory ||
      String(inventory.tenantId) !==
        String(tenantId)
    ) {
      throw new ApiError(
        404,
        "Inventory not found."
      );
    }

    const result =
      await StockMovementRepository.findByInventory(
        tenantId,
        inventoryId,
        query
      );

    return StockMovementDTO.inventoryMovementListResponse(
      result
    );
  }

  async getReferenceMovements(
    user,
    referenceType,
    referenceId
  ) {
    const tenantId =
      this.resolveTenantId(user);

    const movements =
      await StockMovementRepository.findByReference(
        tenantId,
        referenceType,
        referenceId
      );

    return movements.map((movement) =>
      StockMovementDTO.stockMovementResponse(
        movement
      )
    );
  }
}

export default new StockMovementService();