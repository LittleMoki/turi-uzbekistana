import { Router } from 'express'
import {
	CreateCity,
	DeleteCity,
	EditCity,
	ShowAllCities,
	ShowCity, ShowCityUrl,
} from '../controller/TourCityController.js'

const router = Router()

router.post('/', CreateCity)
router.get('/', ShowAllCities)
router.get('/:id', ShowCity)
router.get('/:url/url', ShowCityUrl)
router.put('/:id', EditCity)
router.delete('/:id', DeleteCity)

export default router
