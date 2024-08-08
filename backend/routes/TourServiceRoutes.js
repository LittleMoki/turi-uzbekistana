import { Router } from 'express'
import {
	CreateServices,
	DeleteServices,
	EditServices,
	ShowAllServices,
	ShowServices,
} from '../controller/TourServicesController.js'
const router = Router()

router.put('/:id', EditServices)
router.get('/:id', ShowServices)
router.get('/', ShowAllServices)
router.post('/', CreateServices)
router.delete('/:id', DeleteServices)

export default router
