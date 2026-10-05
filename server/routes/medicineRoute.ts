import { Router } from "express";
import { getMedicines, markTaken } from "../controllers/medicineController.ts";
import { authenticateToken } from "../middleware/auth/AuthenticateToken.ts";
import { auditMiddleware } from "../middleware/auditMiddleware.ts";

const router = Router();

router.use(authenticateToken); // Protect all medicine routes

router.get("/", 
    auditMiddleware("FETCH_MEDICINES", "Medicine"), 
    getMedicines
);

router.patch("/:id/taken", 
    auditMiddleware("MARK_MEDICINE_TAKEN", "Medicine"), 
    markTaken
);

export default router;
