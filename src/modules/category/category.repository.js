
import Category from "./category.model.js";

class CategoryRepository {
  // Create Category
  async createCategory(categoryData) {
    return await Category.create(categoryData);
  }

  // Find By ID
 async findById(id, tenantId) {
  return await Category.findOne({
    _id: id,
    tenantId,
    isDeleted: false,
  });
}


  // Find By Name (Tenant Wise)
  async findByName(name, tenantId) {
    return await Category.findOne({
      tenantId,
      name,
      isDeleted: false,
    });
  }

  // Get All Categories
  async findAllByTenant(tenantId) {
    return await Category.find({
      tenantId,
      isDeleted: false,
    }).sort({
      displayOrder: 1,
      createdAt: -1,
    });
  }

  // Get Active Categories
  async findActiveByTenant(tenantId) {
    return await Category.find({
      tenantId,
      isDeleted: false,
      isActive: true,
    }).sort({
      displayOrder: 1,
      createdAt: -1,
    });
  }

  // Update Category
async updateCategory(id, tenantId, updateData) {
  return await Category.findOneAndUpdate(
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
  );
}

  // Update Status
async updateStatus(id, tenantId, isActive) {
  return await Category.findOneAndUpdate(
    {
      _id: id,
      tenantId,
      isDeleted: false,
    },
    { isActive },
    {
      new: true,
    }
  );
}

  // Soft Delete
  async deleteCategory(id, tenantId) {
  return await Category.findOneAndUpdate(
    {
      _id: id,
      tenantId,
      isDeleted: false,
    },
    {
      isDeleted: true,
      isActive: false,
    },
    {
      new: true,
    }
  );
}
}

export default new CategoryRepository();