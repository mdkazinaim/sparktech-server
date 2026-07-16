"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitorRoutes = void 0;
const express_1 = require("express");
const visitor_controller_1 = require("./visitor.controller");
const router = (0, express_1.Router)();
// Public heartbeat endpoint to track visitors
router.post("/heartbeat", visitor_controller_1.visitorController.saveHeartbeat);
// Admin-only stats endpoint
router.get("/stats", visitor_controller_1.visitorController.getVisitorStats);
exports.VisitorRoutes = router;
