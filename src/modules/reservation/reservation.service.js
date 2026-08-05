import crypto from "crypto";

import ReservationRepository from "./reservation.repository.js";
import RestaurantRepository from "../restaurant/restaurant.repository.js";

import {
  reservationResponse,
  reservationListResponse,
} from "./reservation.dto.js";

import ApiError from "../../utils/ApiError.js";

class ReservationService {
  async resolveTenantId(user) {
    if (user.tenantId) {
      return user.tenantId;
    }

    const restaurant =
      await RestaurantRepository.findByOwnerId(user.id);

    if (!restaurant) {
      throw new ApiError(404, "Restaurant not found.");
    }

    return restaurant._id;
  }

  generateReservationNumber() {
    return `RES-${Date.now()}-${crypto
      .randomBytes(2)
      .toString("hex")
      .toUpperCase()}`;
  }

  async createReservation(user, payload) {
    const tenantId = await this.resolveTenantId(user);

    const existingReservation =
      await ReservationRepository.findByTableAndDate(
        tenantId,
        payload.tableId,
        payload.reservationDate,
        payload.timeSlot
      );

    if (existingReservation) {
      throw new ApiError(
        400,
        "Table is already reserved for the selected date and time slot."
      );
    }

    const reservationNumber =
      this.generateReservationNumber();

    const reservation =
      await ReservationRepository.create({
        ...payload,
        tenantId,
        reservationNumber,
      });

    const populatedReservation =
      await ReservationRepository.findById(
        reservation._id
      );

    return reservationResponse(populatedReservation);
  }

  async getAllReservations(user) {
    const tenantId = await this.resolveTenantId(user);

    const reservations =
      await ReservationRepository.findAllByTenant(
        tenantId
      );

    return reservationListResponse(reservations);
  }

  async getReservationById(user, id) {
    const tenantId = await this.resolveTenantId(user);

    const reservation =
      await ReservationRepository.findById(id);

    if (
      !reservation ||
      String(reservation.tenantId) !==
        String(tenantId)
    ) {
      throw new ApiError(
        404,
        "Reservation not found."
      );
    }

    return reservationResponse(reservation);
  }

  async updateStatus(user, id, status) {
    const tenantId = await this.resolveTenantId(user);

    const reservation =
      await ReservationRepository.findById(id);

    if (
      !reservation ||
      String(reservation.tenantId) !==
        String(tenantId)
    ) {
      throw new ApiError(
        404,
        "Reservation not found."
      );
    }

    const updatedReservation =
      await ReservationRepository.updateStatus(
        id,
        status
      );

    return reservationResponse(updatedReservation);
  }

  async checkIn(user, id) {
    const tenantId = await this.resolveTenantId(user);

    const reservation =
      await ReservationRepository.findById(id);

    if (
      !reservation ||
      String(reservation.tenantId) !==
        String(tenantId)
    ) {
      throw new ApiError(
        404,
        "Reservation not found."
      );
    }

    const updatedReservation =
      await ReservationRepository.checkIn(id);

    return reservationResponse(updatedReservation);
  }

  async checkOut(user, id) {
    const tenantId = await this.resolveTenantId(user);

    const reservation =
      await ReservationRepository.findById(id);

    if (
      !reservation ||
      String(reservation.tenantId) !==
        String(tenantId)
    ) {
      throw new ApiError(
        404,
        "Reservation not found."
      );
    }

    const updatedReservation =
      await ReservationRepository.checkOut(id);

    return reservationResponse(updatedReservation);
  }

  async cancelReservation(user, id) {
    const tenantId = await this.resolveTenantId(user);

    const reservation =
      await ReservationRepository.findById(id);

    if (
      !reservation ||
      String(reservation.tenantId) !==
        String(tenantId)
    ) {
      throw new ApiError(
        404,
        "Reservation not found."
      );
    }

    const updatedReservation =
      await ReservationRepository.cancel(id);

    return reservationResponse(updatedReservation);
  }

  async deleteReservation(user, id) {
    const tenantId = await this.resolveTenantId(user);

    const reservation =
      await ReservationRepository.findById(id);

    if (
      !reservation ||
      String(reservation.tenantId) !==
        String(tenantId)
    ) {
      throw new ApiError(
        404,
        "Reservation not found."
      );
    }

    await ReservationRepository.softDelete(id);

    return null;
  }
}

export default new ReservationService();