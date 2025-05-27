import { Router } from 'express';
import { body, param } from 'express-validator';
import asyncHandler from '../../middleware/asyncHandler.js';
import SyncController from './controller.js';

const router = Router();

router.post(
    '/event',
    [
        body('device_id').isUUID(),
        body('timestamp').isISO8601(),
        body('total_files_synced').isInt({ min: 0 }),
        body('total_errors').isInt({ min: 0 }),
        body('internet_speed').isFloat({ min: 0 })
    ],
    asyncHandler(SyncController.createEvent)
);

router.get(
    '/device/:id/history',
    [ param('id').isUUID() ],
    asyncHandler(SyncController.getHistory)
);

router.get(
    '/devices/repeated-failures',
    asyncHandler(SyncController.getRepeatedFailures)
);

export default router;
