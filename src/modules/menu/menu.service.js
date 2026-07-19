// src/modules/menu/menu.service.js

import MenuRepository from "./menu.repository.js";
import CategoryRepository from "../category/category.repository.js";
import RestaurantRepository from "../restaurant/restaurant.repository.js";
import { menuResponse } from "./menu.dto.js";
import ApiError from "../../utils/ApiError.js";

class MenuService {
  async resolveTenantId(user) {
    if (user.tenantId) {
      return user.tenantId;
    }

    const restaurant = await RestaurantRepository.findByOwnerId(
      user.id
    );

    if (!restaurant) {
      throw new ApiError(404, "Restaurant not found");
    }

    return restaurant._id;
  }

  // Create Menu
  async createMenu(user, menuData) {
    const tenantId = await this.resolveTenantId(user);

    // Check Category
    const category = await CategoryRepository.findById(
      menuData.categoryId,
      tenantId
    );

    if (!category) {
      throw new ApiError(404, "Category not found");
    }

    // Check Duplicate Name
    const existingName = await MenuRepository.findByName(
      menuData.name.trim(),
      tenantId
    );

    if (existingName) {
      throw new ApiError(409, "Menu name already exists");
    }

    // Check Duplicate SKU
    const existingSku = await MenuRepository.findBySku(
      menuData.sku.trim().toUpperCase(),
      tenantId
    );

    if (existingSku) {
      throw new ApiError(409, "SKU already exists");
    }

    const menu = await MenuRepository.createMenu({
      ...menuData,
      tenantId,
      name: menuData.name.trim(),
      sku: menuData.sku.trim().toUpperCase(),
    });

    const createdMenu = await MenuRepository.findById(
      menu._id,
      tenantId
    );

    return menuResponse(createdMenu);
  }

  // Get All Menu
  async getAllMenu(user) {
    const tenantId = await this.resolveTenantId(user);

    const menu = await MenuRepository.findAllByTenant(
      tenantId
    );

    return menu.map(menuResponse);
  }

  // Get Menu By ID
  async getMenuById(user, menuId) {
    const tenantId = await this.resolveTenantId(user);

    const menu = await MenuRepository.findById(
      menuId,
      tenantId
    );

    if (!menu) {
      throw new ApiError(404, "Menu not found");
    }

    return menuResponse(menu);
  }

  // Update Menu
  async updateMenu(user, menuId, updateData) {
    const tenantId = await this.resolveTenantId(user);

    if (updateData.categoryId) {
      const category = await CategoryRepository.findById(
        updateData.categoryId,
        tenantId
      );

      if (!category) {
        throw new ApiError(404, "Category not found");
      }
    }

    if (updateData.name) {
      const existingName = await MenuRepository.findByName(
        updateData.name.trim(),
        tenantId
      );

      if (
        existingName &&
        existingName._id.toString() !== menuId
      ) {
        throw new ApiError(409, "Menu name already exists");
      }

      updateData.name = updateData.name.trim();
    }

    if (updateData.sku) {
      const existingSku = await MenuRepository.findBySku(
        updateData.sku.trim().toUpperCase(),
        tenantId
      );

      if (
        existingSku &&
        existingSku._id.toString() !== menuId
      ) {
        throw new ApiError(409, "SKU already exists");
      }

      updateData.sku = updateData.sku.trim().toUpperCase();
    }

    const menu = await MenuRepository.updateMenu(
      menuId,
      tenantId,
      updateData
    );

    if (!menu) {
      throw new ApiError(404, "Menu not found");
    }

    return menuResponse(menu);
  }

  // Update Availability
  async updateAvailability(user, menuId, isAvailable) {
    const tenantId = await this.resolveTenantId(user);

    const menu = await MenuRepository.updateAvailability(
      menuId,
      tenantId,
      isAvailable
    );

    if (!menu) {
      throw new ApiError(404, "Menu not found");
    }

    return menuResponse(menu);
  }

  // Delete Menu
  async deleteMenu(user, menuId) {
    const tenantId = await this.resolveTenantId(user);

    const menu = await MenuRepository.deleteMenu(
      menuId,
      tenantId
    );

    if (!menu) {
      throw new ApiError(404, "Menu not found");
    }

    return null;
  }
}

export default new MenuService();
