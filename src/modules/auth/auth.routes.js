import { Router } from "express";

import {
  register,
  login,
  logout,
  getCurrentUser,
  
} from "./auth.controller.js";
import * as AuthController from "./auth.controller.js";
import {
  registerValidation,
  loginValidation,
} from "./auth.validation.js";

import validationMiddleware from "../../middlewares/validation.middleware.js";
import authMiddleware from "../../middlewares/auth.middleware.js";


const router = Router();

router.post(
  "/register",
  registerValidation,
  validationMiddleware,
  register
);

router.post(
  "/login",
  loginValidation,
  validationMiddleware,
  login
);

router.post(
  "/logout",
  authMiddleware,
  logout
);
router.get("/me", authMiddleware, AuthController.getCurrentUser);

export default router;