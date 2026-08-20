import { Router } from "express";

import ReportsController from "./reports.controller.js";

import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import { ROLES } from "../../constants/roles.js";

const router = Router();

router.use(authMiddleware);
router.use(roleMiddleware(ROLES.OWNER, ROLES.ADMIN, ROLES.MANAGER));

router.get("/dashboard", ReportsController.getDashboardReport);
router.get("/sales", ReportsController.getSalesReport);
router.get("/purchases", ReportsController.getPurchaseReport);
router.get("/inventory", ReportsController.getInventoryReport);
router.get("/stock-movement", ReportsController.getStockMovementReport);
router.get("/payments", ReportsController.getPaymentReport);
router.get("/orders", ReportsController.getOrderReport);

export default router;
