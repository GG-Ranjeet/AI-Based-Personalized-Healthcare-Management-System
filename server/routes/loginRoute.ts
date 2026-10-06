import { Router } from "express";
import { loginController } from "../controllers/loginController.ts";
import { auditMiddleware } from "../middleware/auditMiddleware.ts";

const router = Router();

router.post('/', 
    auditMiddleware('LOGIN_ATTEMPT', 'Auth'), 
    loginController
);

export default router;