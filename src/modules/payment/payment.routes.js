import { Router } from "express";

import PaymentController from "./payment.controller.js";

import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import validate from "../../middlewares/validation.middleware.js";

import {
  createPaymentValidation,
  verifyPaymentValidation,
  refundPaymentValidation,
  paymentIdValidation,
} from "./payment.validation.js";

import { ROLES } from "../../constants/roles.js";

const router = Router();

router.use(authMiddleware);

router.post(
  "/create-order",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.CASHIER
  ),
  createPaymentValidation,
  validate,
  PaymentController.createPayment
);

router.post(
  "/verify-payment",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.CASHIER
  ),
  verifyPaymentValidation,
  validate,
  PaymentController.verifyPayment
);

router.post(
  "/refund/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN
  ),
  refundPaymentValidation,
  validate,
  PaymentController.refundPayment
);

router.get(
  "/list",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.CASHIER
  ),
  PaymentController.getAllPayments
);

router.get(
  "/details/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.CASHIER
  ),
  paymentIdValidation,
  validate,
  PaymentController.getPaymentById
);

router.delete(
  "/delete/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN
  ),
  paymentIdValidation,
  validate,
  PaymentController.deletePayment
);

export default router;