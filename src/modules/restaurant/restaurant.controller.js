import RestaurantService from "./restaurant.service.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

class RestaurantController {
  // Create Restaurant
  createRestaurant = asyncHandler(async (req, res) => {
    const restaurant = await RestaurantService.createRestaurant(
      req.user.id,
      req.body
    );

    return res.status(201).json(
      new ApiResponse(
        201,
        restaurant,
        "Restaurant created successfully"
      )
    );
  });

  // Get Logged-in User Restaurant
  getMyRestaurant = asyncHandler(async (req, res) => {
    const restaurant = await RestaurantService.getMyRestaurant(req.user.id);

    return res.status(200).json(
      new ApiResponse(
        200,
        restaurant,
        "Restaurant fetched successfully"
      )
    );
  });

  // Get Restaurant By ID
  getRestaurantById = asyncHandler(async (req, res) => {
    const restaurant = await RestaurantService.getRestaurantById(
      req.params.id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        restaurant,
        "Restaurant fetched successfully"
      )
    );
  });

  // Get All Restaurants (Admin)
  getAllRestaurants = asyncHandler(async (req, res) => {
    const restaurants = await RestaurantService.getAllRestaurants();

    return res.status(200).json(
      new ApiResponse(
        200,
        restaurants,
        "Restaurants fetched successfully"
      )
    );
  });

  // Update Restaurant
  updateRestaurant = asyncHandler(async (req, res) => {
    const restaurant = await RestaurantService.updateRestaurant(
      req.params.id,
      req.body
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        restaurant,
        "Restaurant updated successfully"
      )
    );
  });

  // Delete Restaurant
  deleteRestaurant = asyncHandler(async (req, res) => {
    await RestaurantService.deleteRestaurant(req.params.id);

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Restaurant deleted successfully"
      )
    );
  });
}

export default new RestaurantController();