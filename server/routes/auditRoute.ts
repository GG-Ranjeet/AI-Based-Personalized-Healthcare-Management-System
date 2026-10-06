import { Router } from "express";
import { getAuditLogs, deleteAuditLog, deleteAllAuditLogs } from "../controllers/auditController.ts";
import { authenticateToken } from "../middleware/auth/AuthenticateToken.ts";

const router = Router();

router.use(authenticateToken); // Protect all audit routes
router.get("/", getAuditLogs);
router.delete("/:id", deleteAuditLog);
router.delete("/", deleteAllAuditLogs);

export default router;
