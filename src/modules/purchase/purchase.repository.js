import Purchase from "./purchase.model.js";

class PurchaseRepository {
  async create(payload) {
    return await Purchase.create(payload);
  }

  async findById(id) {
    return await Purchase.findOne({
      _id: id,
      isDeleted: false,
    })
      .populate(
        "supplierId",
        "supplierCode supplierName contactPerson phone email gstNumber"
      )
      .populate(
        "items.inventoryId",
        "itemCode itemName category unit currentStock"
      );
  }

  async findByPurchaseNumber(
    tenantId,
    purchaseNumber
  ) {
    return await Purchase.findOne({
      tenantId,
      purchaseNumber,
      isDeleted: false,
    });
  }

  async findAllByTenant(
    tenantId,
    {
      page = 1,
      limit = 10,
      search = "",
      supplierId,
      status,
      paymentStatus,
      fromDate,
      toDate,
    } = {}
  ) {
    const filter = {
      tenantId,
      isDeleted: false,
    };

    if (search) {
      filter.$or = [
        {
          purchaseNumber: {
            $regex: search,
            $options: "i",
          },
        },
        {
          invoiceNumber: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (supplierId) {
      filter.supplierId = supplierId;
    }

    if (status) {
      filter.purchaseStatus = status;
    }

    if (paymentStatus) {
      filter.paymentStatus = paymentStatus;
    }

    if (fromDate || toDate) {
      filter.purchaseDate = {};

      if (fromDate) {
        filter.purchaseDate.$gte =
          new Date(fromDate);
      }

      if (toDate) {
        const endDate = new Date(toDate);
        endDate.setHours(23, 59, 59, 999);

        filter.purchaseDate.$lte = endDate;
      }
    }

    const [items, total] =
      await Promise.all([
        Purchase.find(filter)
          .populate(
            "supplierId",
            "supplierCode supplierName contactPerson phone"
          )
          .sort({
            purchaseDate: -1,
            createdAt: -1,
          })
          .skip((page - 1) * limit)
          .limit(limit),

        Purchase.countDocuments(filter),
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

  async update(id, payload) {
    return await Purchase.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate(
        "supplierId",
        "supplierCode supplierName contactPerson phone email"
      )
      .populate(
        "items.inventoryId",
        "itemCode itemName category unit currentStock"
      );
  }

  async updateStatus(id, purchaseStatus) {
    return await Purchase.findByIdAndUpdate(
      id,
      {
        purchaseStatus,
      },
      {
        new: true,
      }
    );
  }

  async markAsReceived(id) {
    return await Purchase.findByIdAndUpdate(
      id,
      {
        purchaseStatus: "RECEIVED",
        receivedAt: new Date(),
      },
      {
        new: true,
      }
    );
  }

  async markAsCancelled(id) {
    return await Purchase.findByIdAndUpdate(
      id,
      {
        purchaseStatus: "CANCELLED",
      },
      {
        new: true,
      }
    );
  }

  async updatePaymentStatus(
    id,
    paymentStatus,
    paidAmount
  ) {
    return await Purchase.findByIdAndUpdate(
      id,
      {
        paymentStatus,
        paidAmount,
      },
      {
        new: true,
      }
    );
  }

  async softDelete(id) {
    return await Purchase.findByIdAndUpdate(
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
    return await Purchase.countDocuments({
      tenantId,
      isDeleted: false,
    });
  }

  async getTotalPurchaseAmount(
    tenantId,
    fromDate,
    toDate
  ) {
    const match = {
      tenantId,
      isDeleted: false,
      purchaseStatus: "RECEIVED",
    };

    if (fromDate || toDate) {
      match.purchaseDate = {};

      if (fromDate) {
        match.purchaseDate.$gte =
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

        match.purchaseDate.$lte =
          endDate;
      }
    }

    const result =
      await Purchase.aggregate([
        {
          $match: match,
        },
        {
          $group: {
            _id: null,
            totalAmount: {
              $sum: "$grandTotal",
            },
          },
        },
      ]);

    return result[0]?.totalAmount || 0;
  }
}

export default new PurchaseRepository();