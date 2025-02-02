import Router from 'express'
import { getProducts, addProducts, getProductById, updateProduct, deleteProduct} from '../controllers/products.controller.js';
import {authorize} from '../middlewares/auth.js'

const router = new Router();

router.get('/', getProducts);
router.post('/',authorize("admin"), addProducts);

router.get('/:pid', getProductById);
router.put('/:pid',authorize("admin"), updateProduct);
router.delete(':pid',authorize("admin"), deleteProduct);


export default router;