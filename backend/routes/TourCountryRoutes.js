import { Router } from 'express'
import {
	CreateCountry,
	DeleteCountry,
	EditCountry,
	ShowAllCountries,
	ShowCountry, ShowCountryUrl,
} from '../controller/TourCountryController.js'

const router = Router()

router.post('/', CreateCountry)
router.get('/', ShowAllCountries)
router.get('/:id', ShowCountry)
router.get('/:url/url', ShowCountryUrl)
router.put('/:id', EditCountry)
router.delete('/:id', DeleteCountry)

export default router
