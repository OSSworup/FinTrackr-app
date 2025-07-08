import { Router } from "express";
import {addRecurringTransaction,getAllRecurringTransaction,updateRecurringTransaction,deleteRecurringTransaction} from '../controllers/recurringTransactionController.js'
import { jwtAuthMiddleware } from "../middlewares/jwt.js";

const router=Router();

router.post('/add',jwtAuthMiddleware,addRecurringTransaction);
router.get('/get',jwtAuthMiddleware,getAllRecurringTransaction);
router.put('/update/:id',jwtAuthMiddleware,updateRecurringTransaction);
router.delete('/delete/:id',jwtAuthMiddleware,deleteRecurringTransaction);

export default router;
