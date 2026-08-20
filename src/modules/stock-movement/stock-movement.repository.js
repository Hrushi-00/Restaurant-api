import StockMovement from "./stock-movement.model.js";

class StockMovementRepository {
  async create(payload) {
    return await StockMovement.create(payload);
  }

  async findById(id) {
    return await StockMovement.findOne({
      _id: id,
    })
      .populate(
        "inventoryId",
        "itemCode itemName category unit currentStock"
      )
      .populate(
        "performedBy",
        "name email role"
      );
  }

  async findAllByTenant(
    tenantId,
    {
      page = 1,
      limit = 10,
      inventoryId,
      movementType,
      referenceType,
      fromDate,
      toDate,
    } = {}
  ) {
    const filter = {
      tenantId,
    };

    if (inventoryId) {
      filter.inventoryId = inventoryId;
    }

    if (movementType) {
      filter.movementType = movementType;
    }

    if (referenceType) {
      filter.referenceType = referenceType;
    }

    if (fromDate || toDate) {
      filter.createdAt = {};

      if (fromDate) {
        filter.createdAt.$gte =
          new Date(fromDate);
      }

      if (toDate) {
        const endDate = new Date(toDate);

        endDate.setHours(
          23,
          59,
          59,
          999
        );

        filter.createdAt.$lte = endDate;
      }
    }

    const [items, total] =
      await Promise.all([
        StockMovement.find(filter)
          .populate(
            "inventoryId",
            "itemCode itemName category unit currentStock"
          )
          .populate(
            "performedBy",
            "name email role"
          )
          .sort({
            createdAt: -1,
          })
          .skip((page - 1) * limit)
          .limit(limit),

        StockMovement.countDocuments(filter),
      ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(
        total / limit
      ),
    };
  }

  async findByInventory(
    tenantId,
    inventoryId,
    {
      page = 1,
      limit = 20,
    } = {}
  ) {
    const filter = {
      tenantId,
      inventoryId,
    };

    const [items, total] =
      await Promise.all([
        StockMovement.find(filter)
          .populate(
            "performedBy",
            "name email role"
          )
          .sort({
            createdAt: -1,
          })
          .skip((page - 1) * limit)
          .limit(limit),

        StockMovement.countDocuments(filter),
      ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(
        total / limit
      ),
    };
  }

  async findByReference(
    tenantId,
    referenceType,
    referenceId
  ) {
    return await StockMovement.find({
      tenantId,
      referenceType,
      referenceId,
    }).sort({
      createdAt: -1,
    });
  }

  async getLatestByInventory(
    tenantId,
    inventoryId
  ) {
    return await StockMovement.findOne({
      tenantId,
      inventoryId,
    }).sort({
      createdAt: -1,
    });
  }

  async countByTenant(tenantId) {
    return await StockMovement.countDocuments({
      tenantId,
    });
  }
}

export default new StockMovementRepository();