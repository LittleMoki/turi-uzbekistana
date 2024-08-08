import { Router } from 'express'
import {
	CreateTour,
	DeleteTour,
	DeleteTourCity,
	DeleteTourCountry,
	DeleteTourDayPrice,
	DeleteTourFaq,
	DeleteTourImages,
	DeleteTourToday,
	EditTour,
	ShowAllTours,
	ShowTour,
	ShowTourByUrl,
} from '../controller/MainTourController.js'

const router = Router()

router.post('/', CreateTour)
router.get('/', ShowAllTours)
router.get('/:tourUrl/url', ShowTourByUrl)
router.get('/:id', ShowTour)
router.put('/:id', EditTour)
router.delete('/:id', DeleteTour)
router.delete('/:id/tourtoday', DeleteTourToday)
router.delete('/:id/faq', DeleteTourFaq)
router.delete('/:id/country', DeleteTourCountry)
router.delete('/:id/city', DeleteTourCity)
router.delete('/:id/images', DeleteTourImages)
router.delete('/:id/tourDayPrice', DeleteTourDayPrice)

export default router
