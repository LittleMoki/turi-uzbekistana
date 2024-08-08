import { Router } from 'express'
import {
	CreateUsers,
	DeleteUsers,
	EditUsers,
	ShowAllUsers,
	ShowUsers,
} from '../controller/TourUserController.js'

const router = Router()

router.get('/', ShowAllUsers)
router.post('/', CreateUsers)
router.get('/:id', ShowUsers)
router.delete('/:id', DeleteUsers)
router.put('/:id', EditUsers)

export default router
