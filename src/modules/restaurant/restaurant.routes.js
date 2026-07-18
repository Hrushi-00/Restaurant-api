import { Router } from "express";

import RestaurantController from "./restaurant.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";

import ROLES from "../../constants/roles.js";

import {
  createRestaurantValidation,
  updateRestaurantValidation,
} from "./restaurant.validation.js";

const router = Router();

// Create Restaurant
router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.OWNER),
  createRestaurantValidation,
  validationMiddleware,
  RestaurantController.createRestaurant
);

// Get My Restaurant
router.get(
  "/me",
  authMiddleware,
  RestaurantController.getMyRestaurant
);

// Get All Restaurants (Admin / Owner)
router.get(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.OWNER, ROLES.ADMIN),
  RestaurantController.getAllRestaurants
);

// Get Restaurant By ID
router.get(
  "/:id",
  authMiddleware,
  RestaurantController.getRestaurantById
);

// Update Restaurant
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.OWNER, ROLES.ADMIN),
  updateRestaurantValidation,
  validationMiddleware,
  RestaurantController.updateRestaurant
);

// Delete Restaurant
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.OWNER, ROLES.ADMIN),
  RestaurantController.deleteRestaurant
);

export default router;