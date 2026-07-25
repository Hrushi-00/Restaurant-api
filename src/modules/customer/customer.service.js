import ApiError from "../../utils/ApiError.js";

import RestaurantRepository from "../restaurant/restaurant.repository.js";

import CustomerRepository from "./customer.repository.js";

import {
  customerResponse,
  customerListResponse,
} from "./customer.dto.js";

class CustomerService {
  // Resolve Tenant
  async resolveTenantId(user) {
    if (user.tenantId) {
      return user.tenantId;
    }

    const restaurant =
      await RestaurantRepository.findByOwnerId(user.id);

    if (!restaurant) {
      throw new ApiError(404, "Restaurant not found");
    }

    return restaurant._id;
  }

  // Create Customer
  async createCustomer(user, payload) {
    const tenantId = await this.resolveTenantId(user);

    const existingPhone =
      await CustomerRepository.findByPhone(
        payload.phone,
        tenantId
      );

    if (existingPhone) {
      throw new ApiError(
        409,
        "Customer already exists with this phone number"
      );
    }

    if (payload.email) {
      const existingEmail =
        await CustomerRepository.findByEmail(
          payload.email,
          tenantId
        );

      if (existingEmail) {
        throw new ApiError(
          409,
          "Customer already exists with this email"
        );
      }
    }

    const customer =
      await CustomerRepository.createCustomer({
        tenantId,
        ...payload,
      });

    return customerResponse(customer);
  }

  // Get All Customers
  async getAllCustomers(user) {
    const tenantId = await this.resolveTenantId(user);

    const customers =
      await CustomerRepository.findAllByTenant(
        tenantId
      );

    return customerListResponse(customers);
  }

  // Get Customer By Id
  async getCustomerById(user, customerId) {
    const tenantId = await this.resolveTenantId(user);

    const customer =
      await CustomerRepository.findById(
        customerId,
        tenantId
      );

    if (!customer) {
      throw new ApiError(
        404,
        "Customer not found"
      );
    }

    return customerResponse(customer);
  }

  // Search Customers
  async searchCustomers(user, keyword) {
    const tenantId = await this.resolveTenantId(user);

    const customers =
      await CustomerRepository.searchCustomers(
        tenantId,
        keyword
      );

    return customerListResponse(customers);
  }
  // Get Top Customers
async getTopCustomers(user) {
  const tenantId = await this.resolveTenantId(user);

  const customers =
    await CustomerRepository.getTopCustomers(
      tenantId
    );

  return customerListResponse(customers);
}

// Get Recent Customers
async getRecentCustomers(user) {
  const tenantId = await this.resolveTenantId(user);

  const customers =
    await CustomerRepository.getRecentCustomers(
      tenantId
    );

  return customerListResponse(customers);
}

// Update Customer
async updateCustomer(user, customerId, payload) {
  const tenantId = await this.resolveTenantId(user);

  const customer =
    await CustomerRepository.findById(
      customerId,
      tenantId
    );

  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }

  // Duplicate phone check
  if (
    payload.phone &&
    payload.phone !== customer.phone
  ) {
    const existingPhone =
      await CustomerRepository.findByPhone(
        payload.phone,
        tenantId
      );

    if (existingPhone) {
      throw new ApiError(
        409,
        "Customer already exists with this phone number"
      );
    }
  }

  // Duplicate email check
  if (
    payload.email &&
    payload.email !== customer.email
  ) {
    const existingEmail =
      await CustomerRepository.findByEmail(
        payload.email,
        tenantId
      );

    if (existingEmail) {
      throw new ApiError(
        409,
        "Customer already exists with this email"
      );
    }
  }

  const updatedCustomer =
    await CustomerRepository.updateCustomer(
      customerId,
      tenantId,
      payload
    );

  return customerResponse(updatedCustomer);
}

// Delete Customer
async deleteCustomer(user, customerId) {
  const tenantId = await this.resolveTenantId(user);

  const customer =
    await CustomerRepository.findById(
      customerId,
      tenantId
    );

  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }

  await CustomerRepository.deleteCustomer(
    customerId,
    tenantId
  );
}

// Update Customer Statistics
async updateCustomerStats(
  customerId,
  tenantId,
  orderAmount
) {
  const customer =
    await CustomerRepository.findById(
      customerId,
      tenantId
    );

  if (!customer) {
    return;
  }

  await CustomerRepository.updateCustomer(
    customerId,
    tenantId,
    {
      totalOrders:
        (customer.totalOrders || 0) + 1,

      totalSpent:
        (customer.totalSpent || 0) +
        orderAmount,

      loyaltyPoints:
        (customer.loyaltyPoints || 0) +
        Math.floor(orderAmount / 100),

      lastVisit: new Date(),
    }
  );
}
}

export default new CustomerService();