import QrMenu from "./qrMenu.model.js";

class QrMenuRepository {
  async create(data) {
    return await QrMenu.create(data);
  }

  async findById(id) {
    return await QrMenu.findOne({
      _id: id,
      isDeleted: false,
    }).populate("tableId");
  }

  async findByQrCode(qrCode) {
    return await QrMenu.findOne({
      qrCode,
      isDeleted: false,
      status: "ACTIVE",
    }).populate("tableId");
  }

  async findByTable(tenantId, tableId) {
    return await QrMenu.findOne({
      tenantId,
      tableId,
      isDeleted: false,
    });
  }

  async findAllByTenant(tenantId) {
    return await QrMenu.find({
      tenantId,
      isDeleted: false,
    })
      .populate("tableId")
      .sort({ createdAt: -1 });
  }

  async update(id, data) {
    return await QrMenu.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async updateStatus(id, status) {
    return await QrMenu.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );
  }

  async regenerateQr(id, qrCode, qrUrl) {
    return await QrMenu.findByIdAndUpdate(
      id,
      {
        qrCode,
        qrUrl,
      },
      {
        new: true,
      }
    );
  }

  async incrementScanCount(id) {
    return await QrMenu.findByIdAndUpdate(
      id,
      {
        $inc: {
          scanCount: 1,
        },
        lastScannedAt: new Date(),
      },
      {
        new: true,
      }
    );
  }

  async softDelete(id) {
    return await QrMenu.findByIdAndUpdate(
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
    return await QrMenu.countDocuments({
      tenantId,
      isDeleted: false,
    });
  }
}

export default new QrMenuRepository();