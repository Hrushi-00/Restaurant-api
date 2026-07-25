import Customer from "./customer.model.js";

class CustomerRepository {
  // Create Customer
  async createCustomer(customerData) {
    return await Customer.create(customerData);
  }

  // Find By Id
  async findById(customerId, tenantId) {
    return await Customer.findOne({
      _id: customerId,
      tenantId,
      isDeleted: false,
    }).lean();
  }

  // Find By Phone
  async findByPhone(phone, tenantId) {
    return await Customer.findOne({
      phone,
      tenantId,
      isDeleted: false,
    }).lean();
  }

  // Find By Email
  async findByEmail(email, tenantId) {
    return await Customer.findOne({
      email,
      tenantId,
      isDeleted: false,
    }).lean();
  }

  // Get All Customers
  async findAllByTenant(tenantId) {
    return await Customer.find({
      tenantId,
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .lean();
  }

  // Search Customers
  async searchCustomers(tenantId, keyword) {
    return await Customer.find({
      tenantId,
      isDeleted: false,
      $or: [
        {
          name: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          phone: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          email: {
            $regex: keyword,
            $options: "i",
          },
        },
      ],
    })
      .sort({ name: 1 })
      .lean();
  }

  // Update Customer
  async updateCustomer(customerId, tenantId, updateData) {
    return await Customer.findOneAndUpdate(
      {
        _id: customerId,
        tenantId,
        isDeleted: false,
      },
      updateData,
      {
        new: true,
      }
    ).lean();
  }

  // Soft Delete
  async deleteCustomer(customerId, tenantId) {
    return await Customer.findOneAndUpdate(
      {
        _id: customerId,
        tenantId,
        isDeleted: false,
      },
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    ).lean();
  }

  // Dashboard Count
  async countCustomers(tenantId) {
    return await Customer.countDocuments({
      tenantId,
      isDeleted: false,
    });
  }

  // Recent Customers
  async getRecentCustomers(tenantId, limit = 10) {
    return await Customer.find({
      tenantId,
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
  }

  // Top Customers
  async getTopCustomers(tenantId, limit = 10) {
    return await Customer.find({
      tenantId,
      isDeleted: false,
    })
      .sort({
        totalSpent: -1,
        totalOrders: -1,
      })
      .limit(limit)
      .lean();
  }
}

export default new CustomerRepository();