import { Router } from 'express';
import {getBusiness, getBusinessById, createBusiness, addProduct, deleteProduct} from '../controllers/business.controller.js';
import {authorize} from '../middlewares/auth.js'

const router = Router();

router.get('/', getBusiness);
router.post('/', createBusiness);

router.get('/:bid', getBusinessById);

// Permitir solo a "user" agregar productos a un negocio
router.post('/:bid/product', authorize('admin') ,addProduct);

router.delete('/:bid/product', authorize('admin') ,deleteProduct);


export default router;