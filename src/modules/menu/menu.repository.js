// src/modules/menu/menu.repository.js

import Menu from "./menu.model.js";

class MenuRepository {
  // Create Menu
  async createMenu(menuData) {
    return await Menu.create(menuData);
  }

  // Find Menu By ID
  async findById(id, tenantId) {
    return await Menu.findOne({
      _id: id,
      tenantId,
      isDeleted: false,
    }).populate("categoryId", "name");
  }

  // Find Menu By Name
  async findByName(name, tenantId) {
    return await Menu.findOne({
      tenantId,
      name,
      isDeleted: false,
    });
  }

  // Find Menu By SKU
  async findBySku(sku, tenantId) {
    return await Menu.findOne({
      tenantId,
      sku,
      isDeleted: false,
    });
  }

  // Get All Menu Items
  async findAllByTenant(tenantId) {
    return await Menu.find({
      tenantId,
      isDeleted: false,
    })
      .populate("categoryId", "name")
      .sort({
        displayOrder: 1,
        createdAt: -1,
      });
  }

  // Get Menu By Category
  async findByCategory(categoryId, tenantId) {
    return await Menu.find({
      tenantId,
      categoryId,
      isDeleted: false,
    })
      .populate("categoryId", "name")
      .sort({
        displayOrder: 1,
        createdAt: -1,
      });
  }

  // Update Menu
  async updateMenu(id, tenantId, updateData) {
    return await Menu.findOneAndUpdate(
      {
        _id: id,
        tenantId,
        isDeleted: false,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).populate("categoryId", "name");
  }

  // Update Availability
  async updateAvailability(id, tenantId, isAvailable) {
    return await Menu.findOneAndUpdate(
      {
        _id: id,
        tenantId,
        isDeleted: false,
      },
      { isAvailable },
      {
        new: true,
      }
    ).populate("categoryId", "name");
  }

  // Soft Delete
  async deleteMenu(id, tenantId) {
    return await Menu.findOneAndUpdate(
      {
        _id: id,
        tenantId,
        isDeleted: false,
      },
      {
        isDeleted: true,
        isAvailable: false,
      },
      {
        new: true,
      }
    );
  }
}

export default new MenuRepository();