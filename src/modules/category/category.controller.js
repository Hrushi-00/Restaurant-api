
import CategoryService from "./category.service.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

class CategoryController {
  // Create Category
  createCategory = asyncHandler(async (req, res) => {
    const category = await CategoryService.createCategory(
      req.user,
      req.body
    );

    return res.status(201).json(
      new ApiResponse(
        201,
        category,
        "Category created successfully"
      )
    );
  });

  // Get All Categories
  getAllCategories = asyncHandler(async (req, res) => {
    const categories = await CategoryService.getAllCategories(
      req.user
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        categories,
        "Categories fetched successfully"
      )
    );
  });

  // Get Category By ID
  getCategoryById = asyncHandler(async (req, res) => {
    const category = await CategoryService.getCategoryById(
      req.user,
      req.params.id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        category,
        "Category fetched successfully"
      )
    );
  });

  // Update Category
  updateCategory = asyncHandler(async (req, res) => {
    const category = await CategoryService.updateCategory(
      req.user,
      req.params.id,
      req.body
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        category,
        "Category updated successfully"
      )
    );
  });

  // Update Status
  updateStatus = asyncHandler(async (req, res) => {
    const { isActive } = req.body;

    const category = await CategoryService.updateStatus(
      req.user,
      req.params.id,
      isActive
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        category,
        "Category status updated successfully"
      )
    );
  });

  // Delete Category
  deleteCategory = asyncHandler(async (req, res) => {
    await CategoryService.deleteCategory(
      req.user,
      req.params.id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Category deleted successfully"
      )
    );
  });
}

export default new CategoryController();