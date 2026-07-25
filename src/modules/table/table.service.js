import ApiError from "../../utils/ApiError.js";

import RestaurantRepository from "../restaurant/restaurant.repository.js";

import TableRepository from "./table.repository.js";

import {
  tableResponse,
  tableListResponse,
} from "./table.dto.js";

class TableService {
  // Resolve Tenant
  async resolveTenantId(user) {
    if (user.tenantId) {
      return user.tenantId;
    }

    const restaurant =
      await RestaurantRepository.findByOwnerId(user.id);

    if (!restaurant) {
      throw new ApiError(404, "Restaurant not found");
    }

    return restaurant._id;
  }

  // Create Table
  async createTable(user, payload) {
    const tenantId = await this.resolveTenantId(user);

    const existingTable =
      await TableRepository.findByTableNumber(
        payload.tableNumber,
        tenantId
      );

    if (existingTable) {
      throw new ApiError(
        409,
        "Table number already exists"
      );
    }

    const table =
      await TableRepository.createTable({
        tenantId,
        ...payload,
      });

    return tableResponse(table);
  }

  // Get All Tables
  async getAllTables(user) {
    const tenantId = await this.resolveTenantId(user);

    const tables =
      await TableRepository.findAllByTenant(tenantId);

    return tableListResponse(tables);
  }

  // Get Table By Id
  async getTableById(user, tableId) {
    const tenantId = await this.resolveTenantId(user);

    const table =
      await TableRepository.findById(
        tableId,
        tenantId
      );

    if (!table) {
      throw new ApiError(404, "Table not found");
    }

    return tableResponse(table);
  }
  // Get Tables By Status
async getTablesByStatus(user, status) {
  const tenantId = await this.resolveTenantId(user);

  const tables = await TableRepository.findByStatus(
    tenantId,
    status
  );

  return tableListResponse(tables);
}

// Update Table
async updateTable(user, tableId, payload) {
  const tenantId = await this.resolveTenantId(user);

  const table = await TableRepository.findById(
    tableId,
    tenantId
  );

  if (!table) {
    throw new ApiError(404, "Table not found");
  }

  // Check duplicate table number
  if (
    payload.tableNumber &&
    payload.tableNumber !== table.tableNumber
  ) {
    const existingTable =
      await TableRepository.findByTableNumber(
        payload.tableNumber,
        tenantId
      );

    if (existingTable) {
      throw new ApiError(
        409,
        "Table number already exists"
      );
    }
  }

  const updatedTable =
    await TableRepository.updateTable(
      tableId,
      tenantId,
      payload
    );

  return tableResponse(updatedTable);
}

// Update Table Status
async updateTableStatus(user, tableId, status) {
  const tenantId = await this.resolveTenantId(user);

  const table = await TableRepository.findById(
    tableId,
    tenantId
  );

  if (!table) {
    throw new ApiError(404, "Table not found");
  }

  const updatedTable =
    await TableRepository.updateTableStatus(
      tableId,
      tenantId,
      status
    );

  return tableResponse(updatedTable);
}

// Delete Table
async deleteTable(user, tableId) {
  const tenantId = await this.resolveTenantId(user);

  const table = await TableRepository.findById(
    tableId,
    tenantId
  );

  if (!table) {
    throw new ApiError(404, "Table not found");
  }

  await TableRepository.deleteTable(
    tableId,
    tenantId
  );

  return;
}
}

export default new TableService();