import { list,view,create,update,delet } from '../controllers/carControllers.js';
import express from 'express';
const router = express.Router();
router.get('/list', list);
router.get('/view/:id',view);
router.post('/create',create);
router.post('/update/:id',update );
router.get('/delete/:id',delet);
export default router;