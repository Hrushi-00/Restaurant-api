import { Router } from "express";

import CustomerController from "./customer.controller.js";

import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";

import {
  createCustomerValidation,
  updateCustomerValidation,
} from "./customer.validation.js";

import { ROLES } from "../../constants/roles.js";

const router = Router();

router.use(authMiddleware);

// Create Customer
router.post(
  "/create",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.CASHIER
  ),
  createCustomerValidation,
  validationMiddleware,
  CustomerController.createCustomer
);

// Get All Customers
router.get(
  "/list",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.CASHIER
  ),
  CustomerController.getAllCustomers
);

// Search Customers
router.get(
  "/search",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.CASHIER
  ),
  CustomerController.searchCustomers
);

// Top Customers
router.get(
  "/top",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  CustomerController.getTopCustomers
);

// Recent Customers
router.get(
  "/recent",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  CustomerController.getRecentCustomers
);

// Customer Details
router.get(
  "/details/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.CASHIER
  ),
  CustomerController.getCustomerById
);

// Update Customer
router.put(
  "/update/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.CASHIER
  ),
  updateCustomerValidation,
  validationMiddleware,
  CustomerController.updateCustomer
);

// Delete Customer
router.delete(
  "/delete/:id",
  roleMiddleware(
    ROLES.OWNER,
    ROLES.ADMIN
  ),
  CustomerController.deleteCustomer
);

export default router;