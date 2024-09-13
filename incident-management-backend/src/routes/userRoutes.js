import express from 'express';
import { createUser, getUsers, getUserById } from '../controllers/userController.js';
import { authGuard } from '../middleware/authMiddleware.js';
import { createUserValidations } from '../middleware/validations/userValidations.js';


const router = express.Router();

router.post('/create', 
    ...createUserValidations, 
    createUser
);

router.get('/', 
    getUsers
);

router.get('/info/:id?', 
    authGuard,
    getUserById
);

export default router;
