import { Router } from 'express';
import {getUsers, getUserById, saveUser, dataCurrent} from '../controllers/users.controller.js';

const router = Router();

router.get('/', getUsers);
router.get('/:uid', getUserById);
router.post('/', saveUser);
router.get('/current', dataCurrent); // Pendiente

export default router;