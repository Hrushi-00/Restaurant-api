export const categoryResponse = (category) => ({
  id: category._id,

  tenantId: category.tenantId,

  name: category.name,

  description: category.description,

  image: category.image,

  displayOrder: category.displayOrder,

  isActive: category.isActive,

  createdAt: category.createdAt,

  updatedAt: category.updatedAt,
});