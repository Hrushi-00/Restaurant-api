// src/modules/menu/menu.controller.js

import MenuService from "./menu.service.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

class MenuController {
  // Create Menu
  createMenu = asyncHandler(async (req, res) => {
    const menu = await MenuService.createMenu(req.user, req.body);

    return res.status(201).json(
      new ApiResponse(201, menu, "Menu item created successfully")
    );
  });

  // Get All Menu
  getAllMenu = asyncHandler(async (req, res) => {
    const menu = await MenuService.getAllMenu(req.user);

    return res.status(200).json(
      new ApiResponse(200, menu, "Menu fetched successfully")
    );
  });

  // Get Menu By Id
  getMenuById = asyncHandler(async (req, res) => {
    const menu = await MenuService.getMenuById(
      req.user,
      req.params.id
    );

    return res.status(200).json(
      new ApiResponse(200, menu, "Menu fetched successfully")
    );
  });

  // Update Menu
  updateMenu = asyncHandler(async (req, res) => {
    const menu = await MenuService.updateMenu(
      req.user,
      req.params.id,
      req.body
    );

    return res.status(200).json(
      new ApiResponse(200, menu, "Menu updated successfully")
    );
  });

  // Update Availability
  updateAvailability = asyncHandler(async (req, res) => {
    const { isAvailable } = req.body;

    const menu = await MenuService.updateAvailability(
      req.user,
      req.params.id,
      isAvailable
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        menu,
        "Menu availability updated successfully"
      )
    );
  });

  // Delete Menu
  deleteMenu = asyncHandler(async (req, res) => {
    await MenuService.deleteMenu(
      req.user,
      req.params.id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Menu deleted successfully"
      )
    );
  });
}

export default new MenuController();