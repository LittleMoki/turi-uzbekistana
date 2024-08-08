import { Router } from 'express'
import {
	CreateOrders,
	DeleteOrders,
	EditOrders,
	ShowAllOrders,
	ShowOrders,
} from '../controller/TourOrdersController.js'

const router = Router()

router.get('/', ShowAllOrders)
router.post('/', CreateOrders)
router.get('/:id', ShowOrders)
router.delete('/:id', DeleteOrders)
router.put('/:id', EditOrders)

export default router
