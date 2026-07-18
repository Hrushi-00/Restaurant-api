import StaffRepository from "./staff.repository.js";
import RestaurantRepository from "../restaurant/restaurant.repository.js";
import { staffResponse } from "./staff.dto.js";
import ApiError from "../../utils/ApiError.js";

class StaffService {
  // Generate Employee ID
  async generateEmployeeId() {
    const employees = await StaffRepository.findAll();

    const count = employees.length + 1;

    return `EMP${String(count).padStart(4, "0")}`;
  }

  // Create Staff
  async createStaff(user, staffData) {
    // Get Restaurant
    const restaurant = await RestaurantRepository.findByOwnerId(user.id);

    if (!restaurant) {
      throw new ApiError(404, "Restaurant not found");
    }

    // Check Email
    const existingEmail = await StaffRepository.findByEmail(
      staffData.email
    );

    if (existingEmail) {
      throw new ApiError(409, "Email already exists");
    }

    // Check Phone
    const existingPhone = await StaffRepository.findByPhone(
      staffData.phone
    );

    if (existingPhone) {
      throw new ApiError(409, "Phone already exists");
    }

    // Generate Employee ID
    const employeeId = await this.generateEmployeeId();

    // Create Staff
    const staff = await StaffRepository.createStaff({
      ...staffData,
      employeeId,
      tenantId: restaurant._id,
    });

    return staffResponse(staff);
  }

  // Get All Staff
  async getAllStaff(user) {
    const restaurant = await RestaurantRepository.findByOwnerId(user.id);

    if (!restaurant) {
      throw new ApiError(404, "Restaurant not found");
    }

    const staff = await StaffRepository.findAllByTenant(
      restaurant._id
    );

    return staff.map((item) => staffResponse(item));
  }

  // Get Staff By ID
  async getStaffById(id) {
    const staff = await StaffRepository.findById(id);

    if (!staff || staff.isDeleted) {
      throw new ApiError(404, "Staff not found");
    }

    return staffResponse(staff);
  }

  // Update Staff
  async updateStaff(id, updateData) {
    const staff = await StaffRepository.updateStaff(
      id,
      updateData
    );

    if (!staff) {
      throw new ApiError(404, "Staff not found");
    }

    return staffResponse(staff);
  }

  // Update Status
  async updateStatus(id, status) {
    const staff = await StaffRepository.updateStatus(
      id,
      status
    );

    if (!staff) {
      throw new ApiError(404, "Staff not found");
    }

    return staffResponse(staff);
  }

  // Delete Staff
  async deleteStaff(id) {
    const staff = await StaffRepository.deleteStaff(id);

    if (!staff) {
      throw new ApiError(404, "Staff not found");
    }

    return null;
  }
}

export default new StaffService();