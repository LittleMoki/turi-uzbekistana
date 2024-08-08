import { Router } from 'express'
import {
	CreatePage,
	DeletePage,
	EditPage,
	ShowAllPages,
	ShowPage,
} from '../controller/TourPagesController.js'

const router = Router()

router.post('/', CreatePage)
router.get('/', ShowAllPages)
router.get('/:id', ShowPage)
router.put('/:id', EditPage)
router.delete('/:id', DeletePage)

export default router
