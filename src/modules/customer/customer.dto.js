// src/modules/customer/customer.dto.js

export const customerResponse = (customer) => {
  if (!customer) return null;

  return {
    id: customer._id,

    tenantId: customer.tenantId,

    name: customer.name,

    phone: customer.phone,

    email: customer.email,

    gender: customer.gender,

    dateOfBirth: customer.dateOfBirth,

    address: customer.address,

    totalOrders: customer.totalOrders,

    totalSpent: customer.totalSpent,

    loyaltyPoints: customer.loyaltyPoints,

    lastVisit: customer.lastVisit,

    notes: customer.notes,

    isActive: customer.isActive,

    createdAt: customer.createdAt,

    updatedAt: customer.updatedAt,
  };
};

export const customerListResponse = (customers = []) => {
  return customers.map(customerResponse);
};