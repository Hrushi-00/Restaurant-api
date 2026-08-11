class SupplierDTO {
  supplierResponse(supplier) {
    if (!supplier) return null;

    return {
      id: supplier._id,

      tenantId: supplier.tenantId,

      supplierCode: supplier.supplierCode,

      supplierName: supplier.supplierName,

      contactPerson: supplier.contactPerson,

      email: supplier.email,

      phone: supplier.phone,

      alternatePhone: supplier.alternatePhone,

      gstNumber: supplier.gstNumber,

      address: {
        address: supplier.address,
        city: supplier.city,
        state: supplier.state,
        country: supplier.country,
        pincode: supplier.pincode,
      },

      status: supplier.status,

      notes: supplier.notes,

      createdAt: supplier.createdAt,

      updatedAt: supplier.updatedAt,
    };
  }

  supplierListResponse(result) {
    return {
      items: result.items.map((supplier) =>
        this.supplierResponse(supplier)
      ),

      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
    };
  }

  activeSupplierResponse(suppliers) {
    return suppliers.map((supplier) => ({
      id: supplier._id,

      supplierCode: supplier.supplierCode,

      supplierName: supplier.supplierName,

      contactPerson: supplier.contactPerson,

      phone: supplier.phone,

      email: supplier.email,
    }));
  }
}

export default new SupplierDTO();