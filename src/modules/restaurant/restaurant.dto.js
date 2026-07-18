
export const restaurantResponse = (restaurant) => ({
  id: restaurant._id,

  name: restaurant.name,

  ownerId: restaurant.ownerId,

  email: restaurant.email,

  phone: restaurant.phone,

  logo: restaurant.logo,

  address: {
    street: restaurant.address?.street,
    city: restaurant.address?.city,
    state: restaurant.address?.state,
    country: restaurant.address?.country,
    pincode: restaurant.address?.pincode,
  },

  gstNumber: restaurant.gstNumber,

  fssaiNumber: restaurant.fssaiNumber,

  timezone: restaurant.timezone,

  currency: restaurant.currency,

  subscriptionPlan: restaurant.subscriptionPlan,

  isActive: restaurant.isActive,

  createdAt: restaurant.createdAt,

  updatedAt: restaurant.updatedAt,
});