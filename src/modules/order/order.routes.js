import { Router } from "express";

import OrderController from "./order.controller.js";

import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";

import {
  createOrderValidation,
  updateOrderValidation,
  updateOrderStatusValidation,
  updatePaymentStatusValidation,
} from "./order.validation.js";

import { ROLES } from "../../constants/roles.js";

const router = Router();

router.use(authMiddleware);

// Create Order
router.post(
  "/create",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.CASHIER
  ),
  createOrderValidation,
  validationMiddleware,
  OrderController.createOrder
);

// Get All Orders
router.get(
  "/list",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.CASHIER
  ),
  OrderController.getAllOrders
);

// Get Order Details
router.get(
  "/details/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.CASHIER
  ),
  OrderController.getOrderById
);

// Update Order
router.put(
  "/update/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  updateOrderValidation,
  validationMiddleware,
  OrderController.updateOrder
);

// Update Order Status
router.patch(
  "/status/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.CHEF
  ),
  updateOrderStatusValidation,
  validationMiddleware,
  OrderController.updateOrderStatus
);

// Update Payment Status
router.patch(
  "/payment/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.CASHIER
  ),
  updatePaymentStatusValidation,
  validationMiddleware,
  OrderController.updatePaymentStatus
);

// Delete Order
router.delete(
  "/delete/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN
  ),
  OrderController.deleteOrder
);

export default router;