import { Router } from "express";
import { visitorController } from "./visitor.controller";

const router = Router();

// Public heartbeat endpoint to track visitors
router.post("/heartbeat", visitorController.saveHeartbeat);

// Admin-only stats endpoint
router.get("/stats", visitorController.getVisitorStats);

export const VisitorRoutes = router;
