import express from 'express';
import { getAllData, createData, getDataById, updateData, deleteData, getAllDen3, createDen3 } from '../controller/dataController.js';

const router = express.Router();

router.get('/get', getAllData);
router.get('/getDen3', getAllDen3);
router.post('/create', createData);
router.post('/createDen3', createDen3);
router.get('/get/:id', getDataById);
router.put('/update/:id', updateData);
router.delete('/delete/:id', deleteData);

export default router;