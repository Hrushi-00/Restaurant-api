
import CategoryRepository from "./category.repository.js";
import RestaurantRepository from "../restaurant/restaurant.repository.js";
import { categoryResponse } from "./category.dto.js";
import ApiError from "../../utils/ApiError.js";

class CategoryService {
  // Create Category
  async createCategory(user, categoryData) {
    const restaurant = await RestaurantRepository.findByOwnerId(user.id);

    if (!restaurant) {
      throw new ApiError(404, "Restaurant not found");
    }

    const existingCategory = await CategoryRepository.findByName(
      categoryData.name.trim(),
      restaurant._id
    );

    if (existingCategory) {
      throw new ApiError(409, "Category already exists");
    }

    const category = await CategoryRepository.createCategory({
      ...categoryData,
      tenantId: restaurant._id,
      name: categoryData.name.trim(),
    });

    return categoryResponse(category);
  }

  // Get All Categories
  async getAllCategories(user) {
    const restaurant = await RestaurantRepository.findByOwnerId(user.id);

    if (!restaurant) {
      throw new ApiError(404, "Restaurant not found");
    }

    const categories = await CategoryRepository.findAllByTenant(
      restaurant._id
    );

    return categories.map(categoryResponse);
  }

  // Get Category By ID
  async getCategoryById(user, categoryId) {
    const restaurant = await RestaurantRepository.findByOwnerId(user.id);

    if (!restaurant) {
      throw new ApiError(404, "Restaurant not found");
    }

    const category = await CategoryRepository.findById(
      categoryId,
      restaurant._id
    );

    if (!category) {
      throw new ApiError(404, "Category not found");
    }

    return categoryResponse(category);
  }

  // Update Category
  async updateCategory(user, categoryId, updateData) {
    const restaurant = await RestaurantRepository.findByOwnerId(user.id);

    if (!restaurant) {
      throw new ApiError(404, "Restaurant not found");
    }

    if (updateData.name) {
      const existingCategory = await CategoryRepository.findByName(
        updateData.name.trim(),
        restaurant._id
      );

      if (
        existingCategory &&
        existingCategory._id.toString() !== categoryId
      ) {
        throw new ApiError(409, "Category already exists");
      }

      updateData.name = updateData.name.trim();
    }

    const updatedCategory =
      await CategoryRepository.updateCategory(
        categoryId,
        restaurant._id,
        updateData
      );

    if (!updatedCategory) {
      throw new ApiError(404, "Category not found");
    }

    return categoryResponse(updatedCategory);
  }

  // Update Status
  async updateStatus(user, categoryId, isActive) {
    const restaurant = await RestaurantRepository.findByOwnerId(user.id);

    if (!restaurant) {
      throw new ApiError(404, "Restaurant not found");
    }

    const category = await CategoryRepository.updateStatus(
      categoryId,
      restaurant._id,
      isActive
    );

    if (!category) {
      throw new ApiError(404, "Category not found");
    }

    return categoryResponse(category);
  }

  // Delete Category
  async deleteCategory(user, categoryId) {
    const restaurant = await RestaurantRepository.findByOwnerId(user.id);

    if (!restaurant) {
      throw new ApiError(404, "Restaurant not found");
    }

    const deletedCategory =
      await CategoryRepository.deleteCategory(
        categoryId,
        restaurant._id
      );

    if (!deletedCategory) {
      throw new ApiError(404, "Category not found");
    }

    return null;
  }
}

export default new CategoryService();