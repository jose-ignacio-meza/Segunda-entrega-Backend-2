import express from 'express';
import {getCarts, createCart, getCartById, addProductCart, updateCart, deleteCart, deleteProductCart, purchase} from '../controllers/cart.controller.js'
import {authorize} from '../middlewares/auth.js'

const router = express.Router();

router.get('/', getCarts);
router.post('/',authorize("user"), createCart)
router.get('/:cid',authorize("user"), getCartById);
router.post('/:cid', authorize("user"), addProductCart);
router.put('/:cid', authorize("user"),updateCart)
router.delete('/:cid', authorize("user"),deleteCart);
router.delete('/:cid/:pid',authorize("user"), deleteProductCart );
router.post('/:cid/purchase', authorize("user"),purchase)


export default router;