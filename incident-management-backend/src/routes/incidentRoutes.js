import express from 'express';
import {
    createIncident, 
    getAllIncidents,
    updateIncidentStatus,
    assignIncident
} from '../controllers/incidentController.js';
import { authGuard } from '../middleware/authMiddleware.js';
import { assignIncidentValidations, createIncidentValidations, updateIncidentValidations } from '../middleware/validations/incidentValidations.js';

const router = express.Router();

router.get('/', 
    authGuard,
    getAllIncidents
);

router.post('/create',
    ...createIncidentValidations,
    authGuard,
    createIncident
);

router.put('/update/:id',
    ...updateIncidentValidations,
    authGuard,
    updateIncidentStatus
);

router.put('/assign/:id',
    ...assignIncidentValidations,
    authGuard,
    assignIncident
);

export default router;
