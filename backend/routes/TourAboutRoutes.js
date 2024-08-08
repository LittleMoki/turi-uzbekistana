import { Router } from 'express'
import {
	CreateAbout,
	DeleteAbout,
	EditAbout,
	ShowAbout,
	ShowAllAbout,
} from '../controller/TourAboutController.js'

const router = Router()

router.get('/', ShowAllAbout)
router.post('/', CreateAbout)
router.get('/:id', ShowAbout)
router.delete('/:id', DeleteAbout)
router.put('/:id', EditAbout)

export default router
