import Coupon from "./coupon.model.js";

class CouponRepository {
  async create(payload) {
    return await Coupon.create(payload);
  }

  async findById(id, tenantId) {
    return await Coupon.findOne({
      _id: id,
      tenantId,
    });
  }

  async findByCode(code, tenantId) {
    return await Coupon.findOne({
      code: code.toUpperCase(),
      tenantId,
    });
  }

  async findAll(tenantId, filters = {}, skip = 0, limit = 20) {
    const query = {
      tenantId,
      ...filters,
    };

    return await Coupon.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  async count(tenantId, filters = {}) {
    return await Coupon.countDocuments({
      tenantId,
      ...filters,
    });
  }

  async updateById(id, tenantId, updates) {
    return await Coupon.findOneAndUpdate(
      {
        _id: id,
        tenantId,
      },
      {
        $set: updates,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async deleteById(id, tenantId) {
    return await Coupon.findOneAndDelete({
      _id: id,
      tenantId,
    });
  }

  async updateStatus(id, tenantId, isActive) {
    return await Coupon.findOneAndUpdate(
      {
        _id: id,
        tenantId,
      },
      {
        $set: {
          isActive,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async incrementUsedCount(id, tenantId) {
    return await Coupon.findOneAndUpdate(
      {
        _id: id,
        tenantId,
      },
      {
        $inc: {
          usedCount: 1,
        },
      },
      {
        new: true,
      }
    );
  }
}

export default new CouponRepository();