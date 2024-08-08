import { Router } from 'express'
import {
	CreateNewsType,
	DeleteNewsType,
	EditNewsType,
	ShowAllNewsType,
	ShowNewsType
} from '../controller/TourNewsTypeController.js'

const router = Router()

router.post('/', CreateNewsType)
router.get('/', ShowAllNewsType)
router.get('/:id', ShowNewsType)
router.put('/:id', EditNewsType)
router.delete('/:id', DeleteNewsType)

export default router
