export const menuResponse = (menu) => ({
  id: menu._id,

  tenantId: menu.tenantId,

  category: menu.categoryId
    ? {
        id: menu.categoryId._id,
        name: menu.categoryId.name,
      }
    : null,

  name: menu.name,

  description: menu.description,

  image: menu.image,

  sku: menu.sku,

  price: menu.price,

  discountPrice: menu.discountPrice,

  preparationTime: menu.preparationTime,

  foodType: menu.foodType,

  taxPercentage: menu.taxPercentage,

  isAvailable: menu.isAvailable,

  isFeatured: menu.isFeatured,

  displayOrder: menu.displayOrder,

  createdAt: menu.createdAt,

  updatedAt: menu.updatedAt,
});