import SupplierRepository from "./supplier.repository.js";
import SupplierDTO from "./supplier.dto.js";
import RestaurantRepository from "../restaurant/restaurant.repository.js";
import ApiError from "../../utils/ApiError.js";

class SupplierService {
  async resolveTenantId(user) {
    if (user.tenantId) {
      return user.tenantId;
    }

    const restaurant =
      await RestaurantRepository.findByOwnerId(user.id);

    if (!restaurant) {
      throw new ApiError(
        404,
        "Restaurant not found."
      );
    }

    return restaurant._id;
  }

  async createSupplier(user, payload) {
    const tenantId =
      await this.resolveTenantId(user);

    const codeExists =
      await SupplierRepository.findBySupplierCode(
        tenantId,
        payload.supplierCode
      );

    if (codeExists) {
      throw new ApiError(
        409,
        "Supplier code already exists."
      );
    }

    const nameExists =
      await SupplierRepository.findBySupplierName(
        tenantId,
        payload.supplierName
      );

    if (nameExists) {
      throw new ApiError(
        409,
        "Supplier name already exists."
      );
    }

    const supplier =
      await SupplierRepository.create({
        tenantId,
        ...payload,
      });

    return SupplierDTO.supplierResponse(
      supplier
    );
  }

  async getAllSuppliers(user, query) {
    const tenantId =
      await this.resolveTenantId(user);

    const suppliers =
      await SupplierRepository.findAllByTenant(
        tenantId,
        query
      );

    return SupplierDTO.supplierListResponse(
      suppliers
    );
  }

  async getSupplierById(user, id) {
    const tenantId =
      await this.resolveTenantId(user);

    const supplier =
      await SupplierRepository.findById(id);

    if (
      !supplier ||
      String(supplier.tenantId) !==
        String(tenantId)
    ) {
      throw new ApiError(
        404,
        "Supplier not found."
      );
    }

    return SupplierDTO.supplierResponse(
      supplier
    );
  }

  async updateSupplier(
    user,
    id,
    payload
  ) {
    const tenantId =
      await this.resolveTenantId(user);

    const supplier =
      await SupplierRepository.findById(id);

    if (
      !supplier ||
      String(supplier.tenantId) !==
        String(tenantId)
    ) {
      throw new ApiError(
        404,
        "Supplier not found."
      );
    }

    if (
      payload.supplierCode &&
      payload.supplierCode !==
        supplier.supplierCode
    ) {
      const codeExists =
        await SupplierRepository.findBySupplierCode(
          tenantId,
          payload.supplierCode
        );

      if (codeExists) {
        throw new ApiError(
          409,
          "Supplier code already exists."
        );
      }
    }

    if (
      payload.supplierName &&
      payload.supplierName !==
        supplier.supplierName
    ) {
      const nameExists =
        await SupplierRepository.findBySupplierName(
          tenantId,
          payload.supplierName
        );

      if (nameExists) {
        throw new ApiError(
          409,
          "Supplier name already exists."
        );
      }
    }

    const updated =
      await SupplierRepository.update(
        id,
        payload
      );

    return SupplierDTO.supplierResponse(
      updated
    );
  }

  async updateSupplierStatus(
    user,
    id,
    status
  ) {
    const tenantId =
      await this.resolveTenantId(user);

    const supplier =
      await SupplierRepository.findById(id);

    if (
      !supplier ||
      String(supplier.tenantId) !==
        String(tenantId)
    ) {
      throw new ApiError(
        404,
        "Supplier not found."
      );
    }

    const updated =
      await SupplierRepository.updateStatus(
        id,
        status
      );

    return SupplierDTO.supplierResponse(
      updated
    );
  }

  async getActiveSuppliers(user) {
    const tenantId =
      await this.resolveTenantId(user);

    const suppliers =
      await SupplierRepository.getActiveSuppliers(
        tenantId
      );

    return SupplierDTO.activeSupplierResponse(
      suppliers
    );
  }

  async deleteSupplier(user, id) {
    const tenantId =
      await this.resolveTenantId(user);

    const supplier =
      await SupplierRepository.findById(id);

    if (
      !supplier ||
      String(supplier.tenantId) !==
        String(tenantId)
    ) {
      throw new ApiError(
        404,
        "Supplier not found."
      );
    }

    await SupplierRepository.softDelete(
      id
    );

    return null;
  }
}

export default new SupplierService();