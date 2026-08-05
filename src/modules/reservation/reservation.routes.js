import { Router } from "express";

import ReservationController from "./reservation.controller.js";

import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import validate from "../../middlewares/validation.middleware.js";

import {
  createReservationValidation,
  reservationIdValidation,
  updateReservationStatusValidation,
} from "./reservation.validation.js";

import { ROLES } from "../../constants/roles.js";

const router = Router();

router.use(authMiddleware);

router.post(
  "/create",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.RECEPTIONIST
  ),
  createReservationValidation,
  validate,
  ReservationController.createReservation
);

router.get(
  "/list",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.RECEPTIONIST
  ),
  ReservationController.getAllReservations
);

router.get(
  "/details/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.RECEPTIONIST
  ),
  reservationIdValidation,
  validate,
  ReservationController.getReservationById
);

router.patch(
  "/update-status/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.RECEPTIONIST
  ),
  updateReservationStatusValidation,
  validate,
  ReservationController.updateStatus
);

router.patch(
  "/check-in/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.RECEPTIONIST
  ),
  reservationIdValidation,
  validate,
  ReservationController.checkIn
);

router.patch(
  "/check-out/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.RECEPTIONIST
  ),
  reservationIdValidation,
  validate,
  ReservationController.checkOut
);

router.patch(
  "/cancel/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.RECEPTIONIST
  ),
  reservationIdValidation,
  validate,
  ReservationController.cancelReservation
);

router.delete(
  "/delete/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN
  ),
  reservationIdValidation,
  validate,
  ReservationController.deleteReservation
);

export default router;