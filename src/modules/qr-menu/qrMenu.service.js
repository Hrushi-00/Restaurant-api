import crypto from "crypto";

import QrMenuRepository from "./qrMenu.repository.js";
import RestaurantRepository from "../restaurant/restaurant.repository.js";

import { qrMenuResponse, qrMenuListResponse } from "./qrMenu.dto.js";

import ApiError from "../../utils/ApiError.js";

class QrMenuService {
  async resolveTenantId(user) {
    if (user.tenantId) {
      return user.tenantId;
    }

    const restaurant = await RestaurantRepository.findByOwnerId(user.id);

    if (!restaurant) {
      throw new ApiError(404, "Restaurant not found.");
    }

    return restaurant._id;
  }

  generateQrCode() {
    return crypto.randomBytes(8).toString("hex").toUpperCase();
  }

  generateQrUrl(qrCode) {
    return `${process.env.FRONTEND_URL}/menu/${qrCode}`;
  }

  async createQrMenu(user, payload) {
    const tenantId = await this.resolveTenantId(user);

    const existingQr = await QrMenuRepository.findByTable(
      tenantId,
      payload.tableId
    );

    if (existingQr) {
      throw new ApiError(
        400,
        "QR Menu already exists for this table."
      );
    }

    const qrCode = this.generateQrCode();

    const qrUrl = this.generateQrUrl(qrCode);

    const qrMenu = await QrMenuRepository.create({
      tenantId,
      tableId: payload.tableId,
      qrCode,
      qrUrl,
    });

    return qrMenuResponse(qrMenu);
  }

  async getAllQrMenus(user) {
    const tenantId = await this.resolveTenantId(user);

    const qrMenus = await QrMenuRepository.findAllByTenant(
      tenantId
    );

    return qrMenuListResponse(qrMenus);
  }

  async getQrMenuById(user, id) {
    const tenantId = await this.resolveTenantId(user);

    const qrMenu = await QrMenuRepository.findById(id);

    if (
      !qrMenu ||
      String(qrMenu.tenantId) !== String(tenantId)
    ) {
      throw new ApiError(404, "QR Menu not found.");
    }

    return qrMenuResponse(qrMenu);
  }

  async updateStatus(user, id, status) {
    const tenantId = await this.resolveTenantId(user);

    const qrMenu = await QrMenuRepository.findById(id);

    if (
      !qrMenu ||
      String(qrMenu.tenantId) !== String(tenantId)
    ) {
      throw new ApiError(404, "QR Menu not found.");
    }

    const updatedQrMenu =
      await QrMenuRepository.updateStatus(
        id,
        status
      );

    return qrMenuResponse(updatedQrMenu);
  }

  async regenerateQr(user, id) {
    const tenantId = await this.resolveTenantId(user);

    const qrMenu = await QrMenuRepository.findById(id);

    if (
      !qrMenu ||
      String(qrMenu.tenantId) !== String(tenantId)
    ) {
      throw new ApiError(404, "QR Menu not found.");
    }

    const qrCode = this.generateQrCode();

    const qrUrl = this.generateQrUrl(qrCode);

    const updatedQrMenu =
      await QrMenuRepository.regenerateQr(
        id,
        qrCode,
        qrUrl
      );

    return qrMenuResponse(updatedQrMenu);
  }

  async scanQr(qrCode) {
    const qrMenu = await QrMenuRepository.findByQrCode(
      qrCode
    );

    if (!qrMenu) {
      throw new ApiError(404, "QR Menu not found.");
    }

    const updatedQrMenu =
      await QrMenuRepository.incrementScanCount(
        qrMenu._id
      );

    return qrMenuResponse(updatedQrMenu);
  }

  async deleteQrMenu(user, id) {
    const tenantId = await this.resolveTenantId(user);

    const qrMenu = await QrMenuRepository.findById(id);

    if (
      !qrMenu ||
      String(qrMenu.tenantId) !== String(tenantId)
    ) {
      throw new ApiError(404, "QR Menu not found.");
    }

    await QrMenuRepository.softDelete(id);

    return null;
  }
}

export default new QrMenuService();