import Inventory from "./inventory.model.js";

class InventoryRepository {
  async create(payload) {
    return Inventory.create(payload);
  }

  async findById(id) {
    return Inventory.findOne({
      _id: id,
      isDeleted: false,
    });
  }

  async findByItemCode(tenantId, itemCode) {
    return Inventory.findOne({
      tenantId,
      itemCode,
      isDeleted: false,
    });
  }

  async findByItemName(tenantId, itemName) {
    return Inventory.findOne({
      tenantId,
      itemName,
      isDeleted: false,
    });
  }

  async findAllByTenant(
    tenantId,
    {
      page = 1,
      limit = 10,
      search = "",
      category,
      status,
      lowStock,
    } = {}
  ) {
    const filter = {
      tenantId,
      isDeleted: false,
    };

    if (search) {
      filter.$or = [
        {
          itemName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          itemCode: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (status) {
      filter.status = status;
    }

    const query = Inventory.find(filter);

    if (lowStock === true || lowStock === "true") {
      query.where("$expr").equals({
        $lte: ["$currentStock", "$minimumStock"],
      });
    }

    const [items, total] = await Promise.all([
      query
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),

      Inventory.countDocuments(filter),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async update(id, payload) {
    return Inventory.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
  }

  async stockIn(id, quantity) {
    return Inventory.findByIdAndUpdate(
      id,
      {
        $inc: {
          currentStock: quantity,
        },
        lastStockInAt: new Date(),
      },
      {
        new: true,
      }
    );
  }

  async stockOut(id, quantity) {
    return Inventory.findByIdAndUpdate(
      id,
      {
        $inc: {
          currentStock: -quantity,
        },
        lastStockOutAt: new Date(),
      },
      {
        new: true,
      }
    );
  }

  async adjustStock(id, quantity) {
    return Inventory.findByIdAndUpdate(
      id,
      {
        currentStock: quantity,
      },
      {
        new: true,
      }
    );
  }

  async changeStatus(id, status) {
    return Inventory.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );
  }

  async softDelete(id) {
    return Inventory.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    );
  }

  async countByTenant(tenantId) {
    return Inventory.countDocuments({
      tenantId,
      isDeleted: false,
    });
  }

  async getLowStockItems(tenantId) {
    return Inventory.find({
      tenantId,
      isDeleted: false,
      $expr: {
        $lte: ["$currentStock", "$minimumStock"],
      },
    }).sort({
      currentStock: 1,
    });
  }

  async getExpiringItems(tenantId, date) {
    return Inventory.find({
      tenantId,
      isDeleted: false,
      expiryDate: {
        $lte: date,
      },
    }).sort({
      expiryDate: 1,
    });
  }
}

export default new InventoryRepository();