import { Router } from "express";
import { getUsers, createUser, updateUser } from "../controllers/userController.ts";
import { authenticateToken } from "../middleware/auth/AuthenticateToken.ts";
import { auditMiddleware } from "../middleware/auditMiddleware.ts";

const router = Router();

router.use(authenticateToken); // Protect all user routes

router.get("/", 
    auditMiddleware("FETCH_USERS", "User"), 
    getUsers
);

router.post("/", 
    auditMiddleware("CREATE_USER", "User"), 
    createUser
);

router.put("/:id", 
    auditMiddleware("UPDATE_USER", "User"), 
    updateUser
);

export default router;
