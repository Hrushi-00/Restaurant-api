import Supplier from "./supplier.model.js";

class SupplierRepository {
  async create(payload) {
    return await Supplier.create(payload);
  }

  async findById(id) {
    return await Supplier.findOne({
      _id: id,
      isDeleted: false,
    });
  }

  async findBySupplierCode(
    tenantId,
    supplierCode
  ) {
    return await Supplier.findOne({
      tenantId,
      supplierCode,
      isDeleted: false,
    });
  }

  async findBySupplierName(
    tenantId,
    supplierName
  ) {
    return await Supplier.findOne({
      tenantId,
      supplierName,
      isDeleted: false,
    });
  }

  async findAllByTenant(
    tenantId,
    {
      page = 1,
      limit = 10,
      search = "",
      status,
    } = {}
  ) {
    const filter = {
      tenantId,
      isDeleted: false,
    };

    if (search) {
      filter.$or = [
        {
          supplierCode: {
            $regex: search,
            $options: "i",
          },
        },
        {
          supplierName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          contactPerson: {
            $regex: search,
            $options: "i",
          },
        },
        {
          phone: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (status) {
      filter.status = status;
    }

    const [items, total] = await Promise.all([
      Supplier.find(filter)
        .sort({
          createdAt: -1,
        })
        .skip((page - 1) * limit)
        .limit(limit),

      Supplier.countDocuments(filter),
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
    return await Supplier.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async updateStatus(id, status) {
    return await Supplier.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
      }
    );
  }

  async softDelete(id) {
    return await Supplier.findByIdAndUpdate(
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
    return await Supplier.countDocuments({
      tenantId,
      isDeleted: false,
    });
  }

  async getActiveSuppliers(tenantId) {
    return await Supplier.find({
      tenantId,
      status: "ACTIVE",
      isDeleted: false,
    }).sort({
      supplierName: 1,
    });
  }
}

export default new SupplierRepository();