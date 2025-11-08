import express from 'express';
import { getMasterData } from '../controllers/masterController.js';
import { verifyToken } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/getData', verifyToken, getMasterData);

export default router;
