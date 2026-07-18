
import Restaurant from "./restaurant.model.js";

class RestaurantRepository {
  // Create Restaurant
  async createRestaurant(restaurantData) {
    return await Restaurant.create(restaurantData);
  }

  // Find Restaurant by ID
  async findById(id) {
    return await Restaurant.findById(id);
  }

  // Find Restaurant by Owner
  async findByOwnerId(ownerId) {
    return await Restaurant.findOne({
      ownerId,
      isDeleted: false,
    });
  }

  // Get All Restaurants
  async findAll(filter = {}) {
    return await Restaurant.find({
      ...filter,
      isDeleted: false,
    }).sort({ createdAt: -1 });
  }

  // Check Existing Email
  async existsByEmail(email) {
    return await Restaurant.findOne({
      email,
      isDeleted: false,
    });
  }

  // Check Existing Phone
  async existsByPhone(phone) {
    return await Restaurant.findOne({
      phone,
      isDeleted: false,
    });
  }

  // Update Restaurant
  async updateRestaurant(id, updateData) {
    return await Restaurant.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  // Soft Delete Restaurant
  async deleteRestaurant(id) {
    return await Restaurant.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        isActive: false,
      },
      { new: true }
    );
  }
}

export default new RestaurantRepository();