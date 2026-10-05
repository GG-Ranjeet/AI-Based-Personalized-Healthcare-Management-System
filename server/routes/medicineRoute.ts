import { Router } from "express";
import { getMedicines, markTaken } from "../controllers/medicineController.ts";
import { authenticateToken } from "../middleware/auth/AuthenticateToken.ts";

const router = Router();

router.use(authenticateToken); // Protect all medicine routes
router.get("/", getMedicines);
router.patch("/:id/taken", markTaken);

export default router;
