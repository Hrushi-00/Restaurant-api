import { Router } from "express";

import CouponController from "./coupon.controller.js";

import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";

import {
  createCouponValidation,
  updateCouponValidation,
  couponIdValidation,
  couponStatusValidation,
  couponListValidation,
  validateCouponValidation,
} from "./coupon.validation.js";

import { ROLES } from "../../constants/roles.js";

const router = Router();

router.use(authMiddleware);

// Create coupon
router.post(
  "/create",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  createCouponValidation,
  validationMiddleware,
  CouponController.createCoupon
);

// Get all coupons
router.get(
  "/list",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  couponListValidation,
  validationMiddleware,
  CouponController.getCoupons
);

// Get coupon by ID
router.get(
  "/details/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  couponIdValidation,
  validationMiddleware,
  CouponController.getCouponById
);

// Validate coupon
router.post(
  "/validate",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.CASHIER
  ),
  validateCouponValidation,
  validationMiddleware,
  CouponController.validateCoupon
);

// Update coupon
router.put(
  "/update/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  updateCouponValidation,
  validationMiddleware,
  CouponController.updateCoupon
);

// Update coupon status
router.patch(
  "/status/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  couponStatusValidation,
  validationMiddleware,
  CouponController.updateStatus
);

// Delete coupon
router.delete(
  "/delete/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN
  ),
  couponIdValidation,
  validationMiddleware,
  CouponController.deleteCoupon
);

export default router;