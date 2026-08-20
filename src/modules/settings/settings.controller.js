import SettingsService from "./settings.service.js";

import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

class SettingsController {
  getSettings = asyncHandler(async (req, res) => {
    const settings =
      await SettingsService.getSettings(
        req.user
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        settings,
        "Settings fetched successfully."
      )
    );
  });

  updateSettings = asyncHandler(
    async (req, res) => {
      const settings =
        await SettingsService.updateSettings(
          req.user,
          req.body
        );

      return res.status(200).json(
        new ApiResponse(
          200,
          settings,
          "Settings updated successfully."
        )
      );
    }
  );
}

export default new SettingsController();