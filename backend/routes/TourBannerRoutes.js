import { Router } from 'express'
import {
	DeleteBanner,
	ShowAllBanners,
	ShowBanner,
	createBanner,
} from '../controller/TourBanner.js'

const router = Router()

router.post('/', createBanner)
router.get('/', ShowAllBanners)
router.get('/:id', ShowBanner)
router.delete('/:id', DeleteBanner)

export default router
