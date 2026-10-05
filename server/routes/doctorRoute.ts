import { Router } from 'express';
import { getDoctors } from '../controllers/doctorController.ts';
import { authenticateToken } from '../middleware/auth/AuthenticateToken.ts';

const router = Router();

router.get('/', authenticateToken, getDoctors);

export default router;
