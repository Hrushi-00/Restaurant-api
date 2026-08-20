import SettingsRepository from "./settings.repository.js";
import SettingsDTO from "./settings.dto.js";

import ApiError from "../../utils/ApiError.js";

class SettingsService {
  resolveTenantId(user) {
    if (user.tenantId) {
      return user.tenantId;
    }

    if (user.restaurantId) {
      return user.restaurantId;
    }

    throw new ApiError(
      400,
      "Tenant ID not found."
    );
  }

  async getSettings(user) {
    const tenantId =
      this.resolveTenantId(user);

    let settings =
      await SettingsRepository.findByTenantId(
        tenantId
      );

    // Create default settings if not exists
    if (!settings) {
      settings =
        await SettingsRepository.createOrUpdate(
          tenantId,
          {
            tenantId,
            restaurantName:
              "My Restaurant",
          }
        );
    }

    return SettingsDTO.settingsResponse(
      settings
    );
  }

  async updateSettings(user, payload) {
    const tenantId =
      this.resolveTenantId(user);

    let settings =
      await SettingsRepository.findByTenantId(
        tenantId
      );

    if (!settings) {
      settings =
        await SettingsRepository.createOrUpdate(
          tenantId,
          {
            tenantId,
            restaurantName:
              payload.restaurantName ||
              "My Restaurant",
            ...payload,
          }
        );
    } else {
      settings =
        await SettingsRepository.updateByTenantId(
          tenantId,
          payload
        );
    }

    if (!settings) {
      throw new ApiError(
        500,
        "Failed to update settings."
      );
    }

    return SettingsDTO.settingsResponse(
      settings
    );
  }
}

export default new SettingsService();