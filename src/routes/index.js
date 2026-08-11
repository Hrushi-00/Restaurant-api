import { Router } from "express";

import authRoutes from "../modules/auth/index.js";
import restaurantRoutes from "../modules/restaurant/index.js";
import staffRoutes from "../modules/staff/index.js";
import categoryRoutes from "../modules/category/index.js";
import menuRoutes from "../modules/menu/index.js";
import orderRoutes from "../modules/order/index.js";
import tableRoutes from "../modules/table/index.js";
import customerRoutes from "../modules/customer/index.js";
import kotRoutes from "../modules/kitchen/index.js";
import qrMenuRoutes from "../modules/qr-menu/index.js";
import reservationRoutes from "../modules/reservation/index.js";
import paymentRoutes from "../modules/payment/index.js";
import inventoryRoutes from "../modules/inventory/index.js";
import supplierRoutes from "../modules/supplier/index.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/restaurants", restaurantRoutes);
router.use("/staff", staffRoutes);
router.use("/categories", categoryRoutes);
router.use("/menu", menuRoutes);
router.use("/orders", orderRoutes);
router.use("/tables", tableRoutes);
router.use("/customers", customerRoutes);
router.use("/kot", kotRoutes);
router.use("/qr-menu", qrMenuRoutes);
router.use("/reservation", reservationRoutes);
router.use("/payment", paymentRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/supplier", supplierRoutes);

export default router;