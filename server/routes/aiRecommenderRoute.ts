import { Router } from "express";
import { continueChat, startNewChat, getSessions, getSessionHistory, deleteSession, renameSession, pinSession } from "../controllers/aiController.ts";

const router = Router();

router.post('/new', startNewChat);
router.post('/:sessionId', continueChat);
router.get('/sessions', getSessions);
router.get('/sessions/:sessionId', getSessionHistory);
router.delete('/sessions/:sessionId', deleteSession);
router.patch('/sessions/:sessionId/rename', renameSession);
router.patch('/sessions/:sessionId/pin', pinSession);

export default router;