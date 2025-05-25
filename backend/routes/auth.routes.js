import express from 'express';
import { login, register } from '../controller/auth.controller.js';

//routering setup 
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;