import {Router} from "express";
import {CreateOrder, deleteOrders, ShowAllOrders, showOrder, updateOrder} from "../controller/TourOrderController.js";

const router = Router()

router.post('/', CreateOrder)
router.get('/', ShowAllOrders)
router.get('/:id', showOrder)
router.put('/:id', updateOrder)
router.delete('/:id', deleteOrders)

export default router