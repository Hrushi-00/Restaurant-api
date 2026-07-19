import { Router } from "express";

import authRoutes from "../modules/auth/index.js";
import restaurantRoutes from "../modules/restaurant/index.js";
import staffRoutes from "../modules/staff/index.js";
import categoryRoutes from "../modules/category/index.js";
import menuRoutes from "../modules/menu/index.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/restaurants", restaurantRoutes);
router.use("/staff", staffRoutes);
router.use("/categories", categoryRoutes);
router.use("/menu", menuRoutes);
export default router;