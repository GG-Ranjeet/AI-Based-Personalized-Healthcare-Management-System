import { Router } from 'express';
import { authenticateToken } from '../middleware/auth/AuthenticateToken.ts';
import { getAppointments, createAppointment, cancelAppointment } from '../controllers/appointmentController.ts';

const router = Router();

router.get('/', authenticateToken, getAppointments);
router.post('/', authenticateToken, createAppointment);
router.patch('/:id/cancel', authenticateToken, cancelAppointment);

export default router;
