import { Router } from "express";
import {addTransaction,getAllTransaction,updateTransaction,deleteTransaction} from '../controllers/transactionController.js'
import { jwtAuthMiddleware } from "../middlewares/jwt.js";

const router=Router();

router.post('/add',jwtAuthMiddleware,addTransaction);
router.get('/get',jwtAuthMiddleware,getAllTransaction);
router.put('/update/:id',jwtAuthMiddleware,updateTransaction);
router.delete('/delete/:id',jwtAuthMiddleware,deleteTransaction);

export default router;