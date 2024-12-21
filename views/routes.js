import express from 'express';
import { getData, createData, updateData } from '../controller/dataController.js';

const router = express.Router();

router.get('/get', getData);
router.post('/create', createData);
router.put('/update/:id', updateData);

export default router