import { Router, type Request, type Response } from "express";
import { getSystemStats } from "../controllers/statusController.ts";
import { authenticateToken } from "../middleware/auth/AuthenticateToken.ts";

const router = Router();

router.get('', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'Backend is connected'
  })
});

// Added route to fetch real stats
router.get('/stats', authenticateToken, getSystemStats);

export default router