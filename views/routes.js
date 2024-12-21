import express from 'express';
import { getData, createData } from '../controller/dataController.js';

const router = express.Router();

router.get('/get', getData);
router.post('/create', createData);

export default router;