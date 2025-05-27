import { Router } from 'express';
import syncRouter from './modules/sync/router.js';

const router = Router();
router.use('/sync', syncRouter);
export default router;
