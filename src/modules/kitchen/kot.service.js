import KOTRepository from "./kot.repository.js";
import RestaurantRepository from "../restaurant/restaurant.repository.js";
import { kotResponse, kotListResponse } from "./kot.dto.js";
import ApiError from "../../utils/ApiError.js";

class KOTService {
  async resolveTenantId(user) {
    if (user.tenantId) {
      return user.tenantId;
    }

    const restaurant = await RestaurantRepository.findByOwnerId(user.id);

    if (!restaurant) {
      throw new ApiError(404, "Restaurant not found");
    }

    return restaurant._id;
  }

  async createKOT(user, payload) {
    const tenantId = await this.resolveTenantId(user);

    const existing = await KOTRepository.findByOrder(payload.orderId);

    if (existing) {
      throw new ApiError(
        400,
        "Kitchen ticket already exists for this order"
      );
    }

    const kot = await KOTRepository.create({
      ...payload,
      tenantId,
    });

    return kotResponse(kot);
  }

  async getAllKOT(user) {
    const tenantId = await this.resolveTenantId(user);

    const data = await KOTRepository.findAllByTenant(
      tenantId
    );

    return kotListResponse(data);
  }

  async getKOTById(user, id) {
    const tenantId = await this.resolveTenantId(user);

    const kot = await KOTRepository.findById(id);

    if (!kot || String(kot.tenantId) !== String(tenantId)) {
      throw new ApiError(
        404,
        "Kitchen ticket not found"
      );
    }

    return kotResponse(kot);
  }

  async getKitchenQueue(user) {
    const tenantId = await this.resolveTenantId(user);

    const queue =
      await KOTRepository.findKitchenQueue(
        tenantId
      );

    return kotListResponse(queue);
  }

  async getReadyOrders(user) {
    const tenantId = await this.resolveTenantId(user);

    const ready =
      await KOTRepository.findReadyOrders(
        tenantId
      );

    return kotListResponse(ready);
  }

  async updateStatus(user, id, status) {
    const tenantId = await this.resolveTenantId(user);

    const kot = await KOTRepository.findById(id);

    if (!kot || String(kot.tenantId) !== String(tenantId)) {
      throw new ApiError(
        404,
        "Kitchen ticket not found"
      );
    }

    const updateData = {
      status,
    };

    if (status === "PREPARING") {
      updateData.startedAt = new Date();
    }

    if (status === "READY") {
      updateData.completedAt = new Date();
    }

    const updated =
      await KOTRepository.update(
        id,
        updateData
      );

    return kotResponse(updated);
  }

  async assignChef(user, id, chefId) {
    const tenantId = await this.resolveTenantId(user);

    const kot = await KOTRepository.findById(id);

    if (!kot || String(kot.tenantId) !== String(tenantId)) {
      throw new ApiError(
        404,
        "Kitchen ticket not found"
      );
    }

    const updated =
      await KOTRepository.assignChef(
        id,
        chefId
      );

    return kotResponse(updated);
  }

  async deleteKOT(user, id) {
    const tenantId = await this.resolveTenantId(user);

    const kot = await KOTRepository.findById(id);

    if (!kot || String(kot.tenantId) !== String(tenantId)) {
      throw new ApiError(
        404,
        "Kitchen ticket not found"
      );
    }

    await KOTRepository.softDelete(id);

    return null;
  }
}

export default new KOTService();