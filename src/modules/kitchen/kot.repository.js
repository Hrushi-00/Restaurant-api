import KOT from "./kot.model.js";

class KOTRepository {
  async create(data) {
    return await KOT.create(data);
  }

  async findById(id) {
    return await KOT.findOne({
      _id: id,
      isDeleted: false,
    })
      .populate("orderId")
      .populate("tableId")
      .populate("chefId", "name email");
  }

  async findByOrder(orderId) {
    return await KOT.findOne({
      orderId,
      isDeleted: false,
    });
  }

  async findAllByTenant(tenantId) {
    return await KOT.find({
      tenantId,
      isDeleted: false,
    }).sort({
      createdAt: -1,
    });
  }

  async findKitchenQueue(tenantId) {
    return await KOT.find({
      tenantId,
      status: {
        $in: ["NEW", "ACCEPTED", "PREPARING"],
      },
      isDeleted: false,
    }).sort({
      tokenNumber: 1,
    });
  }

  async findReadyOrders(tenantId) {
    return await KOT.find({
      tenantId,
      status: "READY",
      isDeleted: false,
    }).sort({
      completedAt: 1,
    });
  }

  async update(id, data) {
    return await KOT.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async updateStatus(id, status) {
    return await KOT.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );
  }

  async assignChef(id, chefId) {
    return await KOT.findByIdAndUpdate(
      id,
      { chefId },
      {
        new: true,
      }
    );
  }

  async softDelete(id) {
    return await KOT.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    );
  }

  async countKitchenQueue(tenantId) {
    return await KOT.countDocuments({
      tenantId,
      status: {
        $in: ["NEW", "ACCEPTED", "PREPARING"],
      },
      isDeleted: false,
    });
  }

  async countReadyOrders(tenantId) {
    return await KOT.countDocuments({
      tenantId,
      status: "READY",
      isDeleted: false,
    });
  }
}

export default new KOTRepository();