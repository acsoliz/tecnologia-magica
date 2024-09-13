import express from 'express';
import { login } from '../controllers/authController.js';
import { loginValidations } from '../middleware/validations/loginValidations.js';

const router = express.Router();

router.post('/login',
    ...loginValidations, 
    login
);

export default router;
