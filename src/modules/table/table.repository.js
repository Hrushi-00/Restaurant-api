import Table from "./table.model.js";

class TableRepository {
  // Create Table
  async createTable(tableData) {
    return await Table.create(tableData);
  }

  // Find By Id
  async findById(tableId, tenantId) {
    return await Table.findOne({
      _id: tableId,
      tenantId,
      isDeleted: false,
    }).lean();
  }

  // Find By Table Number
  async findByTableNumber(tableNumber, tenantId) {
    return await Table.findOne({
      tableNumber,
      tenantId,
      isDeleted: false,
    }).lean();
  }

  // Get All Tables
  async findAllByTenant(tenantId) {
    return await Table.find({
      tenantId,
      isDeleted: false,
    })
      .sort({ tableNumber: 1 })
      .lean();
  }

  // Get Active Tables
  async findActiveTables(tenantId) {
    return await Table.find({
      tenantId,
      isDeleted: false,
      isActive: true,
    })
      .sort({ tableNumber: 1 })
      .lean();
  }

  // Get Tables By Status
  async findByStatus(tenantId, status) {
    return await Table.find({
      tenantId,
      status,
      isDeleted: false,
    })
      .sort({ tableNumber: 1 })
      .lean();
  }

  // Update Table
  async updateTable(tableId, tenantId, updateData) {
    return await Table.findOneAndUpdate(
      {
        _id: tableId,
        tenantId,
        isDeleted: false,
      },
      updateData,
      {
        new: true,
      }
    ).lean();
  }

  // Update Table Status
  async updateTableStatus(tableId, tenantId, status) {
    return await Table.findOneAndUpdate(
      {
        _id: tableId,
        tenantId,
        isDeleted: false,
      },
      {
        status,
      },
      {
        new: true,
      }
    ).lean();
  }

  // Soft Delete
  async deleteTable(tableId, tenantId) {
    return await Table.findOneAndUpdate(
      {
        _id: tableId,
        tenantId,
        isDeleted: false,
      },
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    ).lean();
  }

  // Dashboard Count
  async countTables(tenantId) {
    return await Table.countDocuments({
      tenantId,
      isDeleted: false,
    });
  }

  // Available Tables Count
  async countAvailableTables(tenantId) {
    return await Table.countDocuments({
      tenantId,
      status: "AVAILABLE",
      isDeleted: false,
    });
  }

  // Occupied Tables Count
  async countOccupiedTables(tenantId) {
    return await Table.countDocuments({
      tenantId,
      status: "OCCUPIED",
      isDeleted: false,
    });
  }
}

export default new TableRepository();