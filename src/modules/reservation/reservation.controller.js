import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import ReservationService from "./reservation.service.js";

class ReservationController {
  createReservation = asyncHandler(async (req, res) => {
    const result =
      await ReservationService.createReservation(
        req.user,
        req.body
      );

    return res.status(201).json(
      new ApiResponse(
        201,
        result,
        "Reservation created successfully."
      )
    );
  });

  getAllReservations = asyncHandler(async (req, res) => {
    const result =
      await ReservationService.getAllReservations(
        req.user
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        result,
        "Reservations fetched successfully."
      )
    );
  });

  getReservationById = asyncHandler(async (req, res) => {
    const result =
      await ReservationService.getReservationById(
        req.user,
        req.params.id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        result,
        "Reservation fetched successfully."
      )
    );
  });

  updateStatus = asyncHandler(async (req, res) => {
    const result =
      await ReservationService.updateStatus(
        req.user,
        req.params.id,
        req.body.status
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        result,
        "Reservation status updated successfully."
      )
    );
  });

  checkIn = asyncHandler(async (req, res) => {
    const result =
      await ReservationService.checkIn(
        req.user,
        req.params.id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        result,
        "Customer checked in successfully."
      )
    );
  });

  checkOut = asyncHandler(async (req, res) => {
    const result =
      await ReservationService.checkOut(
        req.user,
        req.params.id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        result,
        "Customer checked out successfully."
      )
    );
  });

  cancelReservation = asyncHandler(async (req, res) => {
    const result =
      await ReservationService.cancelReservation(
        req.user,
        req.params.id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        result,
        "Reservation cancelled successfully."
      )
    );
  });

  deleteReservation = asyncHandler(async (req, res) => {
    await ReservationService.deleteReservation(
      req.user,
      req.params.id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Reservation deleted successfully."
      )
    );
  });
}

export default new ReservationController();