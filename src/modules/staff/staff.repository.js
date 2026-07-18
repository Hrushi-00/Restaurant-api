import Staff from "./staff.model.js";

class StaffRepository {
  // Create Staff
  async createStaff(staffData) {
    return await Staff.create(staffData);
  }

  // Find Staff By ID
  async findById(id) {
    return await Staff.findById(id);
  }
async findAll() {
  return await Staff.find({
    isDeleted: false,
  });
}
  // Find Staff By Employee ID
  async findByEmployeeId(employeeId) {
    return await Staff.findOne({
      employeeId,
      isDeleted: false,
    });
  }

  // Find Staff By Email
  async findByEmail(email) {
    return await Staff.findOne({
      email,
      isDeleted: false,
    });
  }

  // Find Staff By Phone
  async findByPhone(phone) {
    return await Staff.findOne({
      phone,
      isDeleted: false,
    });
  }

  // Get All Staff of a Restaurant
  async findAllByTenant(tenantId) {
    return await Staff.find({
      tenantId,
      isDeleted: false,
    }).sort({ createdAt: -1 });
  }

  // Update Staff
  async updateStaff(id, updateData) {
    return await Staff.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  // Update Staff Status
  async updateStatus(id, status) {
    return await Staff.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );
  }

  // Soft Delete Staff
  async deleteStaff(id) {
    return await Staff.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        status: "INACTIVE",
      },
      {
        new: true,
      }
    );
  }
  
}

export default new StaffRepository();