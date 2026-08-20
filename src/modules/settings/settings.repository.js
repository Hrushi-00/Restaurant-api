import Settings from "./settings.model.js";

class SettingsRepository {
  async findByTenantId(tenantId) {
    return await Settings.findOne({
      tenantId,
    });
  }

  async create(payload) {
    return await Settings.create(payload);
  }

  async updateByTenantId(tenantId, updates) {
    return await Settings.findOneAndUpdate(
      { tenantId },
      {
        $set: updates,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async createOrUpdate(tenantId, updates) {
    return await Settings.findOneAndUpdate(
      { tenantId },
      {
        $set: updates,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );
  }

  async deleteByTenantId(tenantId) {
    return await Settings.findOneAndDelete({
      tenantId,
    });
  }
}

export default new SettingsRepository();