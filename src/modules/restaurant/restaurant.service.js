
import RestaurantRepository from "./restaurant.repository.js";
import AuthRepository from "../auth/auth.repository.js";
import ApiError from "../../utils/ApiError.js";
import { restaurantResponse } from "./restaurant.dto.js";

class RestaurantService {
  // Create Restaurant
  async createRestaurant(userId, restaurantData) {
    // Check if owner already has a restaurant
    const existingRestaurant = await RestaurantRepository.findByOwnerId(userId);

    if (existingRestaurant) {
      throw new ApiError(409, "Restaurant already exists for this owner");
    }

    // Check duplicate email
    const emailExists = await RestaurantRepository.existsByEmail(
      restaurantData.email
    );

    if (emailExists) {
      throw new ApiError(409, "Restaurant email already exists");
    }

    // Check duplicate phone
    const phoneExists = await RestaurantRepository.existsByPhone(
      restaurantData.phone
    );

    if (phoneExists) {
      throw new ApiError(409, "Restaurant phone already exists");
    }

    // Create Restaurant
    const restaurant = await RestaurantRepository.createRestaurant({
      ...restaurantData,
      ownerId: userId,
    });

    // Update User Tenant ID
    await AuthRepository.updateUser(userId, {
      tenantId: restaurant._id,
    });

    return restaurantResponse(restaurant);
  }

  // Get My Restaurant
  async getMyRestaurant(userId) {
    const restaurant = await RestaurantRepository.findByOwnerId(userId);

    if (!restaurant) {
      throw new ApiError(404, "Restaurant not found");
    }

    return restaurantResponse(restaurant);
  }

  // Get Restaurant By ID
  async getRestaurantById(id) {
    const restaurant = await RestaurantRepository.findById(id);

    if (!restaurant || restaurant.isDeleted) {
      throw new ApiError(404, "Restaurant not found");
    }

    return restaurantResponse(restaurant);
  }

  // Update Restaurant
  async updateRestaurant(id, updateData) {
    const restaurant = await RestaurantRepository.updateRestaurant(
      id,
      updateData
    );

    if (!restaurant) {
      throw new ApiError(404, "Restaurant not found");
    }

    return restaurantResponse(restaurant);
  }

  // Delete Restaurant
  async deleteRestaurant(id) {
    const restaurant = await RestaurantRepository.deleteRestaurant(id);

    if (!restaurant) {
      throw new ApiError(404, "Restaurant not found");
    }

    return null;
  }

  // Get All Restaurants (Admin)
  async getAllRestaurants() {
    const restaurants = await RestaurantRepository.findAll();

    return restaurants.map((restaurant) =>
      restaurantResponse(restaurant)
    );
  }
}

export default new RestaurantService();