import { Router } from "express";
import { continueChat, startNewChat, getSessions, getSessionHistory } from "../controllers/aiController.ts";

const router = Router();

router.post('/new', startNewChat);
router.post('/:sessionId', continueChat);
router.get('/sessions', getSessions);
router.get('/sessions/:sessionId', getSessionHistory);

export default router;